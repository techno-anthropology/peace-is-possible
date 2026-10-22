import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { products, shopIntro, type Product } from "@/content/products";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { container, h2 } from "@/components/site/styles";

export const metadata = pageMeta("shop", "/collections/all");

const price = (n: number) => `$${n.toFixed(2)}`;

function ProductCard({ p, i }: { p: Product; i: number }) {
  return (
    <Reveal delay={(i % 4) * 0.05}>
      <a href={p.url} target="_blank" rel="noopener" className="group block">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)]">
          <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition duration-[1200ms] group-hover:scale-[1.04]" />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold leading-snug">{p.name}</h3>
            <p className="mt-1 text-sm text-[var(--ink-2)]">{p.sub}</p>
          </div>
          <p className="whitespace-nowrap text-right font-semibold">
            <span className="mr-1 text-xs font-normal text-[var(--ink-3)]">from</span>
            {price(p.priceFrom)}
          </p>
        </div>
        {p.desc && <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-2)]">{p.desc}</p>}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]">
          Buy on our store <ArrowUpRight size={14} weight="bold" />
        </span>
      </a>
    </Reveal>
  );
}

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
            <ProductCard key={p.handle} p={p} i={i} />
          ))}
        </div>
      </section>
      <section id="merch" className={`${container} scroll-mt-24 pt-24 md:pt-32`}>
        <h2 className={h2}>Merch</h2>
        <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {merch.map((p, i) => (
            <ProductCard key={p.handle} p={p} i={i} />
          ))}
        </div>
      </section>
    </>
  );
}
