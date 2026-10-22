// Usage: node scripts/shot.mjs <path> <outfile> [desktop|mobile] [scrollY] [fullPage]
// Screenshots the running dev server (http://localhost:3000).
// PALETTE=forest|sage|dawn forces the prototype palette for every direction.
import { chromium } from "playwright";

const [path = "/", out = "shot.png", device = "desktop", scrollY = "0", full = ""] = process.argv.slice(2);
const viewport = device === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport, deviceScaleFactor: device === "mobile" ? 2 : 1, isMobile: device === "mobile", hasTouch: device === "mobile" });
if (process.env.PALETTE) {
  await page.addInitScript((p) => {
    for (const d of ["v1-canopy", "v2-water", "v3-peak"]) localStorage.setItem(`pip-palette-${d}`, p);
  }, process.env.PALETTE);
}
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle", timeout: 90000 });
await page.evaluate((y) => window.scrollTo(0, Number(y)), scrollY);
await page.waitForTimeout(2500);
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
if (overflow > 0) console.log(`HORIZONTAL OVERFLOW: ${overflow}px`);
await page.screenshot({ path: out, fullPage: full === "full" });
if (errors.length) console.log("PAGE ERRORS:\n" + errors.join("\n"));
await browser.close();
