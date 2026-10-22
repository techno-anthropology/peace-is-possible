// End-to-end checks against a production build.
// Usage: pnpm build && node scripts/qa.mjs [--shots <dir>]
// Uses the server on QA_URL (default http://localhost:3100), or starts
// `pnpm start -p 3100` if nothing is listening. --shots saves full-page
// desktop and mobile screenshots of every route for a visual pass.
// Never submits the contact form (it emails Ronnie) and never follows checkout.
import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { booking, nav, site } from "../src/content/site.ts";

const base = process.env.QA_URL ?? "http://localhost:3100";
const shotsArg = process.argv.indexOf("--shots");
const shotsDir = shotsArg > -1 ? process.argv[shotsArg + 1] : null;
const root = new URL("..", import.meta.url);

const sizes = [
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
];
const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844 };

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok: !!ok, detail });
  return ok;
}

async function serverUp() {
  try {
    return (await fetch(base, { redirect: "manual" })).status < 500;
  } catch {
    return false;
  }
}

let server = null;
if (!(await serverUp())) {
  server = spawn("pnpm", ["start", "-p", new URL(base).port || "3100"], { cwd: root, stdio: "ignore", detached: true });
  for (let i = 0; i < 60 && !(await serverUp()); i++) await new Promise((r) => setTimeout(r, 500));
  if (!(await serverUp())) throw new Error(`Server did not start on ${base}. Run pnpm build first.`);
}

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });

async function newPage(viewport, options = {}) {
  const context = await browser.newContext({ viewport, isMobile: viewport.width < 768, hasTouch: viewport.width < 768, ...options });
  // Third-party embeds load their own scripts and log their own errors; the site's code is what we check.
  await context.route(/youtube|google\.com|gstatic|googleusercontent/, (r) => r.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && !/net::ERR_FAILED|ERR_BLOCKED/.test(m.text()) && errors.push(`console: ${m.text()}`));
  return { page, errors, close: () => context.close() };
}

// Scrolls a viewport at a time so reveal-on-scroll content settles before checks.
async function scrollThrough(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = page.viewportSize().height * 0.8;
  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1300);
}

const pathOf = (href) => {
  const u = new URL(href, base);
  return u.origin === new URL(base).origin ? u.pathname : null;
};

const crawl = await newPage(desktop);
const routes = [];
const meta = new Map();
const queue = ["/"];
while (queue.length) {
  const path = queue.shift();
  if (routes.includes(path)) continue;
  routes.push(path);
  crawl.errors.length = 0;
  const res = await crawl.page.goto(base + path, { waitUntil: "networkidle" });
  await crawl.page.waitForTimeout(500);
  const info = await crawl.page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? "",
    links: [...document.querySelectorAll("a[href]")].map((a) => a.href),
  }));
  meta.set(path, info);
  check(`${path} returns 200`, res.status() === 200, `status ${res.status()}`);
  check(`${path} has a title and description`, info.title && info.description, info.title);
  check(`${path} has no page or console errors`, crawl.errors.length === 0, crawl.errors.join(" | "));
  for (const href of info.links) {
    const p = pathOf(href);
    if (p && !routes.includes(p) && !queue.includes(p)) queue.push(p);
  }
}
await crawl.close();

const titles = routes.map((r) => meta.get(r).title);
const descriptions = routes.map((r) => meta.get(r).description);
const dupes = (list) => list.filter((x, i) => list.indexOf(x) !== i);
check(`${routes.length} crawled routes have unique titles`, dupes(titles).length === 0, dupes(titles).join(" | "));
check(`${routes.length} crawled routes have unique descriptions`, dupes(descriptions).length === 0, dupes(descriptions).join(" | "));

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const missingFromSitemap = routes.filter((r) => !sitemapPaths.includes(r));
const notCrawled = sitemapPaths.filter((p) => !routes.includes(p));
check("sitemap.xml lists exactly the crawled routes", !missingFromSitemap.length && !notCrawled.length, [...missingFromSitemap, ...notCrawled].join(", "));

async function checkLayout(size) {
  const { page, close } = await newPage(size);
  const overflowing = [];
  for (const path of routes) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await scrollThrough(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) overflowing.push(`${path} (+${overflow}px)`);
  }
  check(`no horizontal overflow at ${size.width}x${size.height}`, overflowing.length === 0, overflowing.join(", "));

  await page.goto(base + "/", { waitUntil: "networkidle" });
  const frame = page.locator("figure:has(video)");
  await frame.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(800);
  const box = await frame.boundingBox();
  const fits = box && box.x >= 0 && box.y >= 0 && box.x + box.width <= size.width && box.y + box.height <= size.height;
  check(`app demo video fully visible at ${size.width}x${size.height}`, fits, box ? `${Math.round(box.width)}x${Math.round(box.height)} at ${Math.round(box.x)},${Math.round(box.y)}` : "no frame");
  await close();
}
await Promise.all(sizes.map(checkLayout));

{
  const { page, close } = await newPage(desktop);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const dialog = page.locator("dialog[aria-labelledby='booking-title']");
  await page.getByRole("button", { name: "Book a free call" }).filter({ visible: true }).first().click();
  check("booking: primary CTA opens the chooser", await dialog.evaluate((d) => d.open && !!d.textContent?.includes("What brings you here?")));
  for (const choice of Object.values(booking)) {
    await dialog.getByRole("button", { name: choice.label }).click();
    const src = await dialog.locator("iframe").getAttribute("src");
    check(`booking: ${choice.coach} loads their calendar`, src === `${choice.url}?gv=true`, src ?? "no iframe");
    await dialog.getByRole("button", { name: "Back to choices" }).click();
  }
  await page.keyboard.press("Escape");
  check("booking: Escape closes the dialog", !(await dialog.evaluate((d) => d.open)));
  await close();
}

{
  const { page, close } = await newPage(mobile);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.locator("#mobile-menu");
  check("mobile menu opens", await menu.isVisible());
  await page.getByRole("button", { name: "Close menu" }).click();
  await menu.waitFor({ state: "detached" });
  check("mobile menu closes", !(await menu.isVisible()));
  const wrong = [];
  for (const item of [...nav, { slug: "/pages/contact", label: "Contact" }]) {
    try {
      await page.getByRole("button", { name: "Open menu" }).click();
      await menu.getByRole("link", { name: item.label, exact: true }).click();
      await page.waitForURL(base + item.slug, { timeout: 5000 });
      await menu.waitFor({ state: "detached", timeout: 5000 });
    } catch (e) {
      wrong.push(`${item.label}: ${e.message.split("\n")[0]}`);
      await page.goto(base + "/");
    }
  }
  check("mobile menu: every link navigates and closes the menu", wrong.length === 0, wrong.join(", "));
  await close();
}

{
  const { page, close } = await newPage(desktop);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const yt = page.locator("iframe[src*='youtube']");
  check("podcast: no YouTube iframe before a click", (await yt.count()) === 0);
  await page.getByRole("button", { name: /^Play: / }).click();
  check("podcast: YouTube iframe after a click", (await yt.count()) === 1);
  await close();
}

{
  const generated = JSON.parse(await readFile(new URL("src/content/products.generated.json", root), "utf8"));
  const variantId = (handle, options) => generated[handle].variants.find((v) => v.options.join("/") === options.join("/")).id;
  const coffee = variantId("colombia-huila", ["Ground", "12oz"]);
  const tee = variantId("peace-is-possible-tee-1", ["M", "Heather Aqua"]);

  const { page, errors, close } = await newPage(desktop);
  await page.goto(base + "/collections/all", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  const pick = async (name, selections) => {
    await page.getByRole("button", { name: `Choose options for ${name}` }).click();
    const picker = page.getByRole("dialog", { name });
    for (const [label, value] of selections) await picker.getByLabel(label).selectOption(value);
    await picker.getByRole("button", { name: "Add to bag" }).click();
    const bag = page.getByRole("dialog", { name: /Your bag/ });
    await bag.waitFor();
    await bag.getByRole("button", { name: "Close bag" }).click();
  };
  await pick("Colombia Huila", [["Beans", "Ground"], ["Bag Size", "12oz"]]);
  await pick("Peace is Possible tee", [["Size", "M"], ["Color", "Heather Aqua"]]);

  await page.getByRole("button", { name: /^Bag, / }).click();
  const bag = page.getByRole("dialog", { name: /Your bag/ });
  await bag.getByRole("button", { name: "Increase quantity of Colombia Huila" }).click();
  check("cart: header count reflects quantity", (await page.getByRole("button", { name: "Bag, 3 items" }).count()) === 1);

  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Bag, 3 items" }).click();
  const href = await page.getByRole("dialog", { name: /Your bag/ }).getByRole("link", { name: "Checkout" }).getAttribute("href");
  const expected = `${site.store}/cart/${coffee}:2,${tee}:1`;
  check("cart: persists across reload and builds the checkout permalink", href === expected, `${href} vs ${expected}`);
  check("cart: no page or console errors", errors.length === 0, errors.join(" | "));
  await close();
}

{
  const { page, close } = await newPage(desktop);
  await page.goto(base + "/pages/contact", { waitUntil: "networkidle" });
  const form = await page.locator("form").evaluate((f) => ({ action: f.action, method: f.method, names: [...f.elements].map((e) => e.name).filter(Boolean) }));
  const want = ["form_type", "utf8", "contact[name]", "contact[phone]", "contact[email]", "contact[body]"];
  check(
    "contact form posts to the store with Shopify field names",
    form.action === `${site.store}/contact` && form.method === "post" && want.every((n) => form.names.includes(n)),
    JSON.stringify(form),
  );
  await close();
}

for (const [from, to] of [
  ["/pages/our-approach", "/pages/eating-disorder-recovery-coaching"],
  ["/v1-canopy/pages/coaches", "/pages/coaches"],
  ["/v1-canopy", "/"],
  ["/v2-water", "/"],
  ["/v3-peak/pages/about", "/"],
]) {
  const res = await fetch(base + from, { redirect: "manual" });
  const location = res.headers.get("location");
  check(`redirect ${from} -> ${to}`, res.status === 308 && location && new URL(location, base).pathname === to, `${res.status} ${location}`);
}

async function checkAxe(label, size) {
  const { page, close } = await newPage(size);
  const failures = [];
  for (const path of routes) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await scrollThrough(page);
    const { violations } = await new AxeBuilder({ page }).analyze();
    for (const v of violations.filter((v) => v.impact === "serious" || v.impact === "critical")) {
      failures.push(`${path}: ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target.join(" ")}`);
    }
    if (shotsDir) {
      await mkdir(shotsDir, { recursive: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);
      const name = path === "/" ? "home" : path.slice(1).replaceAll("/", "_");
      await page.screenshot({ path: `${shotsDir}/${name}-${label}.png`, fullPage: true });
    }
  }
  check(`axe: no serious or critical violations (${label})`, failures.length === 0, failures.join("\n    "));
  await close();
}
await Promise.all([checkAxe("desktop", desktop), checkAxe("mobile", mobile)]);

await browser.close();
if (server) process.kill(-server.pid);

const width = Math.max(...results.map((r) => r.name.length));
console.log(`\n${"CHECK".padEnd(width)}  RESULT`);
for (const r of results) console.log(`${r.name.padEnd(width)}  ${r.ok ? "pass" : "FAIL"}${!r.ok && r.detail ? `\n    ${r.detail}` : ""}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
