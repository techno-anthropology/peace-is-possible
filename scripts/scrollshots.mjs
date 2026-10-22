// Usage: node scripts/scrollshots.mjs <path> <outPrefix> [desktop|mobile] [maxShots]
// Scrolls the page one viewport at a time (so sticky sections and
// scroll-reveals behave like a real visit) and saves each viewport.
import { chromium } from "playwright";

const [path = "/", prefix = "scroll", device = "mobile", max = "40"] = process.argv.slice(2);
const viewport = device === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport, deviceScaleFactor: 1, isMobile: device === "mobile", hasTouch: device === "mobile" });
if (process.env.PALETTE) {
  await page.addInitScript((p) => {
    for (const d of ["v1-canopy", "v2-water", "v3-peak"]) localStorage.setItem(`pip-palette-${d}`, p);
  }, process.env.PALETTE);
}
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(1500);
let i = 0;
for (; i < Number(max); i++) {
  await page.screenshot({ path: `${prefix}-${String(i).padStart(2, "0")}.png` });
  const done = await page.evaluate((h) => {
    const before = window.scrollY;
    window.scrollBy(0, h * 0.85);
    return window.scrollY === before;
  }, viewport.height);
  if (done) break;
  await page.waitForTimeout(900);
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log(`${i + 1} shots${overflow > 0 ? `, HORIZONTAL OVERFLOW ${overflow}px` : ""}`);
if (errors.length) console.log("PAGE ERRORS:\n" + errors.join("\n"));
await browser.close();
