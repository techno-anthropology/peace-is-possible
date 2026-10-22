import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { products, shopIntro, type Product } from "@/content/products";
import { pageMeta } from "@/lib/seo";
import { PageIntro } from "@/directions/water/PageIntro";
import { Reveal } from "@/directions/water/Reveal";

export const metadata: Metadata = pageMeta("shop", "/collections/all");

const price = (n: number) => `From $${n.toFixed(2)}`;

function ProductCard({ p, wide = false }: { p: Product; wide?: boolean }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener"
      className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--accent)] ${wide ? "md:flex-row" : ""}`}
    >
      <div className={`relative aspect-square overflow-hidden bg-[var(--bg-2)] ${wide ? "md:aspect-auto md:w-1/2" : ""}`}>
        <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className={`flex flex-1 flex-col p-5 md:p-6 ${wide ? "md:justify-center md:p-8" : ""}`}>
        <h3 className={`font-semibold leading-snug tracking-tight ${wide ? "text-xl md:text-2xl" : "text-lg"}`}>{p.name}</h3>
        <p className="mt-1 text-sm text-[var(--ink-2)]">{p.sub}</p>
        {p.desc && <p className="mt-3 leading-relaxed text-[var(--ink-2)]">{p.desc}</p>}
        <p className="mt-auto flex items-center justify-between gap-3 pt-5 font-semibold">
          {price(p.priceFrom)}
          <span className="inline-flex items-center gap-1 text-sm text-[var(--accent)]">
            Buy <ArrowUpRight size={14} weight="bold" />
          </span>
        </p>
      </div>
    </a>
  );
}

export default function ShopPage() {
  const coffee = products.filter((p) => p.category === "coffee");
  const merch = products.filter((p) => p.category === "merch");
  return (
    <>
      <PageIntro title={shopIntro.h1} lede={shopIntro.lede} image="/water/pond-trees.webp" />

      <section id="coffee" className="mx-auto max-w-[1400px] scroll-mt-24 px-4 py-24 md:px-8 md:py-28">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Specialty coffee</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {coffee.map((p, i) => (
            <Reveal key={p.handle} delay={(i % 2) * 0.06}>
              <ProductCard p={p} wide />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="merch" className="scroll-mt-24 bg-[var(--bg-2)] py-24 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Shirts and merch</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {merch.map((p, i) => (
              <Reveal key={p.handle} delay={(i % 3) * 0.05}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
