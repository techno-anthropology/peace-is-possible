import { products, shopIntro } from "@/content/products";
import { ProductCard } from "@/components/site/product-card";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { container, h2 } from "@/components/site/styles";

export const metadata = pageMeta("shop");

export default function ShopPage() {
  const coffee = products.filter((p) => p.category === "coffee");
  const merch = products.filter((p) => p.category === "merch");
  return (
    <>
      <PageHero title={shopIntro.h1} lede={shopIntro.lede} image="/canopy/canopy-bright.webp" />
      <section id="coffee" className={`${container} scroll-mt-24`}>
        <h2 className={h2}>Coffee</h2>
        <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {coffee.map((p, i) => (
            <Reveal key={p.handle} delay={(i % 4) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
      <section id="merch" className={`${container} scroll-mt-24 pt-24 md:pt-32`}>
        <h2 className={h2}>Merch</h2>
        <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {merch.map((p, i) => (
            <Reveal key={p.handle} delay={(i % 4) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
