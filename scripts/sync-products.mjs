// Refreshes src/content/products.generated.json from the live Shopify store.
// Usage: node scripts/sync-products.mjs
// Only the handles curated in src/content/products.ts are kept. Prices are
// integer cents. The variant IDs feed the cart permalinks used at checkout.
import { readFile, writeFile } from "node:fs/promises";
import { site } from "../src/content/site.ts";

const store = site.store;
const root = new URL("..", import.meta.url);
const curatedFile = new URL("src/content/products.ts", root);
const outFile = new URL("src/content/products.generated.json", root);

const curatedSource = await readFile(curatedFile, "utf8");
const handles = [...curatedSource.matchAll(/^\s*handle: "([^"]+)",$/gm)].map((m) => m[1]);
if (handles.length === 0) throw new Error(`No curated handles found in ${curatedFile.pathname}`);

const res = await fetch(`${store}/products.json?limit=250`);
if (!res.ok) throw new Error(`${store}/products.json returned ${res.status}`);
const { products } = await res.json();
const byHandle = new Map(products.map((p) => [p.handle, p]));

const toCents = (price) => {
  const [whole, frac = ""] = String(price).split(".");
  return Number(whole) * 100 + Number(frac.padEnd(2, "0").slice(0, 2));
};

const out = {};
for (const handle of handles) {
  const p = byHandle.get(handle);
  if (!p) throw new Error(`Curated product "${handle}" is not in the store's products.json`);
  out[handle] = {
    options: p.options.map((o) => ({ name: o.name, values: o.values })),
    variants: p.variants.map((v) => ({
      id: v.id,
      options: [v.option1, v.option2, v.option3].filter((x) => x != null),
      price: toCents(v.price),
      available: v.available,
    })),
  };
}

await writeFile(outFile, JSON.stringify(out, null, 2) + "\n");
const variantCount = Object.values(out).reduce((n, p) => n + p.variants.length, 0);
console.log(`Wrote ${handles.length} products, ${variantCount} variants to ${outFile.pathname}`);
