import generated from "./products.generated.json";
import { site } from "./site";

// Presentation is curated here. Options, variants and prices come from
// products.generated.json, refreshed with `node scripts/sync-products.mjs`.

export type ProductOption = { name: string; values: string[] };
// price is in integer cents.
export type Variant = { id: number; options: string[]; price: number; available: boolean };

type Curated = {
  handle: string;
  category: "coffee" | "merch";
  name: string;
  sub: string;
  desc: string | null;
  image: string;
};

export type Product = Curated & { options: ProductOption[]; variants: Variant[] };

const curated: Curated[] = [
  {
    handle: "colombia-huila",
    category: "coffee",
    name: "Colombia Huila",
    sub: "Light roast, notes of apple",
    desc: "Smooth and naturally sweet. Huila region, Colombia.",
    image: "/shop/colombia-huila.webp",
  },
  {
    handle: "ethiopia-yirgacheffe",
    category: "coffee",
    name: "Ethiopia",
    sub: "Light roast, delicate and complex",
    desc: "Bright and balanced, from the birthplace of coffee.",
    image: "/shop/ethiopia-yirgacheffe.webp",
  },
  {
    handle: "midnight-meditation-decaf",
    category: "coffee",
    name: "Midnight Meditation Decaf",
    sub: "Decaf, Dutch cocoa and date",
    desc: "Rich and cozy without the caffeine. Good for evenings.",
    image: "/shop/midnight-meditation-decaf.webp",
  },
  {
    handle: "colombia-huila-copy",
    category: "coffee",
    name: "Recovery Blend",
    sub: "Light roast, dried fruit and berry",
    desc: "Our house blend of Guatemala and Ethiopia beans. Bright and a little tangy.",
    image: "/shop/colombia-huila-copy.webp",
  },
  {
    handle: "lift-run-drink-coffee-tee",
    category: "merch",
    name: "Lift, Run, Drink Coffee tee",
    sub: "Classic unisex jersey",
    desc: null,
    image: "/shop/lift-run-drink-coffee-tee.webp",
  },
  {
    handle: "peace-and-play",
    category: "merch",
    name: "Peace and Play tee",
    sub: "Featuring Sora, our schnauzer mascot",
    desc: null,
    image: "/shop/peace-and-play-flat.webp",
  },
  {
    handle: "peace-is-possible-tee-inspirational-graphic-t-shirt-with-earth-logo",
    category: "merch",
    name: "Peace is Possible heavyweight tee",
    sub: "Oversized, sea-green back print",
    desc: null,
    image: "/shop/peace-is-possible-tee-inspirational-grap.webp",
  },
  {
    handle: "peace-is-possible-sticker",
    category: "merch",
    name: "Peace is Possible sticker",
    sub: "Glossy vinyl, three sizes",
    desc: null,
    image: "/shop/peace-is-possible-sticker.webp",
  },
  {
    handle: "peace-is-possible-tee-1",
    category: "merch",
    name: "Peace is Possible tee",
    sub: "Soft unisex cotton",
    desc: null,
    image: "/shop/peace-is-possible-tee-flat.webp",
  },
  {
    handle: "peace-mug-11oz",
    category: "merch",
    name: "Peace mug",
    sub: "11oz ceramic",
    desc: null,
    image: "/shop/peace-mug-11oz.webp",
  },
];

const storeData: Record<string, { options: ProductOption[]; variants: Variant[] }> = generated;

export const products: Product[] = curated.map((c) => {
  const data = storeData[c.handle];
  if (!data) throw new Error(`No store data for "${c.handle}". Run node scripts/sync-products.mjs`);
  return { ...c, ...data };
});

export const variantsById = new Map(products.flatMap((product) => product.variants.map((variant) => [variant.id, { product, variant }] as const)));

export const priceFrom = (p: Product) => Math.min(...p.variants.map((v) => v.price));

export const shopIntro = {
  h1: "Coffee and merch that fund recovery",
  lede: "Every bag of coffee and every shirt pays for sliding-scale coaching. Coffee is roasted to order. Local pickup is available in Colorado Springs.",
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const formatPrice = (cents: number) => usd.format(cents / 100);

export const variantLabel = (v: Variant) => v.options.join(" / ");

export const productUrl = (p: Pick<Product, "handle">) => `${site.store}/products/${p.handle}`;
