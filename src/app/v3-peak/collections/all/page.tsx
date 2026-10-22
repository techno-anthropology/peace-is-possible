import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { products, shopIntro, type Product } from "@/content/products";
import { home } from "@/content/site";
import { Reveal } from "@/directions/peak/Reveal";
import { H2, PageBand } from "@/directions/peak/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("shop", "/collections/all");

const price = (n: number) => `$${n.toFixed(2)}`;

function ProductCard({ p, tall }: { p: Product; tall?: boolean }) {
  return (
    <a href={p.url} target="_blank" rel="noopener" className="group block">
      <div className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)] ${tall ? "aspect-[4/5]" : "aspect-square"}`}>
        <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm text-[var(--ink-2)]">{p.sub}</p>
        </div>
        <p className="text-sm font-medium sm:shrink-0">from {price(p.priceFrom)}</p>
      </div>
      {p.desc && <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">{p.desc}</p>}
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]">
        Buy on our store <ArrowUpRight size={14} weight="bold" />
      </span>
    </a>
  );
}

export default function ShopPage() {
  const coffee = products.filter((p) => p.category === "coffee");
  const merch = products.filter((p) => p.category === "merch");
  return (
    <>
      <PageBand title={shopIntro.h1} lede={shopIntro.lede} />
      <section id="coffee" className="mx-auto max-w-[1400px] scroll-mt-24 px-4 py-20 md:px-10 md:py-24">
        <H2>Specialty coffee</H2>
        <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-[var(--ink-2)]">{home.coffee.body}</p>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {coffee.map((p, i) => (
            <Reveal key={p.handle} delay={i * 0.06}>
              <ProductCard p={p} tall />
            </Reveal>
          ))}
        </div>
      </section>
      <section id="merch" className="scroll-mt-24 bg-[var(--bg-2)]">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-24">
          <H2>Shirts, mugs and stickers</H2>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6">
            {merch.map((p, i) => (
              <Reveal key={p.handle} delay={(i % 3) * 0.06}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
