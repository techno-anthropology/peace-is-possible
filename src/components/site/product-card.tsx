"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CaretDown, X } from "@phosphor-icons/react";
import { formatPrice, priceFrom, productUrl, type Product } from "@/content/products";
import { dispatchCart } from "@/lib/cart";
import { useBag } from "./bag";
import { btnPrimary } from "./styles";

// A value at option i is selectable when some available variant has it and
// agrees with every earlier choice. Earlier options never lock out later ones,
// so a shopper can always reach any in-stock variant from the first select.
const selectable = (p: Product, chosen: string[], i: number, value: string) =>
  p.variants.some((v) => v.available && v.options[i] === value && v.options.slice(0, i).every((o, j) => o === chosen[j]));

// Keeps each choice if it is still selectable, else moves it to the first value that is.
function resolve(p: Product, chosen: string[]): string[] {
  const out: string[] = [];
  p.options.forEach((o, i) => {
    out[i] = selectable(p, out, i, chosen[i]) ? chosen[i] : (o.values.find((v) => selectable(p, out, i, v)) ?? chosen[i]);
  });
  return out;
}

export function ProductCard({ product }: { product: Product }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { openBag } = useBag();
  const [chosen, setChosen] = useState(() => resolve(product, product.options.map((o) => o.values[0])));
  const variant = product.variants.find((v) => v.options.every((o, i) => o === chosen[i]));
  const soldOut = !product.variants.some((v) => v.available);

  useEffect(() => () => dialogRef.current?.close(), []);

  const add = () => {
    if (!variant?.available) return;
    dispatchCart({ type: "add", variantId: variant.id, qty: 1 });
    dialogRef.current?.close();
    openBag();
  };

  const field =
    "w-full appearance-none rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-[var(--field)] px-3.5 py-2.5 text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

  return (
    <article className="group relative">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-[1200ms] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold leading-snug">{product.name}</h3>
          <p className="mt-1 text-sm text-[var(--ink-2)]">{product.sub}</p>
        </div>
        <p className="whitespace-nowrap text-right font-semibold">
          <span className="mr-1 text-xs font-normal text-[var(--ink-3)]">from</span>
          {formatPrice(priceFrom(product))}
        </p>
      </div>
      {product.desc && <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-2)]">{product.desc}</p>}
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        disabled={soldOut}
        aria-haspopup="dialog"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] after:absolute after:inset-0 after:content-[''] disabled:text-[var(--ink-3)]"
      >
        {soldOut ? "Sold out" : "Choose options"}
        <span className="sr-only"> for {product.name}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[min(100vw-1.5rem,52rem)] max-h-[min(100dvh-1.5rem,44rem)] overflow-y-auto rounded-[var(--radius-lg)] bg-[var(--surface)] p-0 text-[var(--ink)] shadow-[0_30px_80px_-20px_rgb(5_20_12/0.45)] backdrop:bg-[rgb(6_18_12/0.55)] backdrop:backdrop-blur-sm"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] bg-[var(--bg-2)] md:aspect-auto">
            <Image src={product.image} alt="" fill sizes="(min-width: 768px) 26rem, 100vw" className="object-cover" />
          </div>
          <div className="relative grid content-start gap-5 p-6 md:p-8">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="absolute right-3 top-3 grid size-10 place-items-center rounded-full text-[var(--ink-2)] transition hover:bg-[var(--bg-2)] active:scale-95"
              aria-label="Close"
            >
              <X size={18} weight="bold" />
            </button>
            <div className="pr-10">
              <h2 id={titleId} className="text-2xl font-semibold tracking-[-0.02em]">
                {product.name}
              </h2>
              <p className="mt-1 text-[var(--ink-2)]">{product.sub}</p>
            </div>
            <p className="text-2xl font-semibold tabular-nums" aria-live="polite">
              {variant ? formatPrice(variant.price) : "Unavailable"}
            </p>
            {product.options.map((o, i) =>
              o.values.length > 1 ? (
                <label key={o.name} className="grid gap-2 text-sm font-medium">
                  {o.name}
                  <span className="relative">
                  <select value={chosen[i]} onChange={(e) => setChosen(resolve(product, chosen.with(i, e.target.value)))} className={`${field} pr-10`}>
                    {o.values.map((v) => {
                      const ok = selectable(product, chosen, i, v);
                      return (
                        <option key={v} value={v} disabled={!ok}>
                          {ok ? v : `${v} (unavailable)`}
                        </option>
                      );
                    })}
                  </select>
                  <CaretDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-2)]" aria-hidden />
                  </span>
                </label>
              ) : (
                <p key={o.name} className="text-sm text-[var(--ink-2)]">
                  {o.name}: {o.values[0]}
                </p>
              ),
            )}
            <button type="button" onClick={add} disabled={!variant?.available} className={`${btnPrimary} w-full disabled:opacity-50`}>
              Add to bag
            </button>
            <a href={productUrl(product)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 justify-self-start text-sm text-[var(--ink-2)] hover:text-[var(--ink)]">
              View on our store <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </dialog>
    </article>
  );
}
