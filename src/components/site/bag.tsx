"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Minus, Plus, ShoppingBag, X } from "@phosphor-icons/react";
import { formatPrice, variantLabel, variantsById } from "@/content/products";
import { MAX_QTY, checkoutUrl, dispatchCart, itemCount, subtotal, useCart } from "@/lib/cart";
import { btnPrimary, textLink } from "./styles";

const Ctx = createContext<{ openBag: () => void } | null>(null);

export function useBag() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBag must be used inside <BagProvider>");
  return ctx;
}

export function BagProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openBag = useCallback(() => dialogRef.current?.showModal(), []);
  const close = useCallback(() => dialogRef.current?.close(), []);
  const cart = useCart();
  const count = itemCount(cart);

  // Hidden routes stay mounted under cacheComponents; never leave a modal open.
  useEffect(() => () => dialogRef.current?.close(), []);

  return (
    <Ctx.Provider value={{ openBag }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="bag-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="bag-sheet m-0 ml-auto h-dvh max-h-dvh w-[min(100vw,28rem)] max-w-full bg-[var(--surface)] p-0 text-[var(--ink)] shadow-[0_0_80px_-20px_rgb(0_0_0/0.6)] backdrop:bg-[rgb(6_18_12/0.55)] backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-4">
            <h2 id="bag-title" className="text-lg font-semibold tracking-tight">
              Your bag {count > 0 && <span className="font-normal text-[var(--ink-3)]">({count})</span>}
            </h2>
            <button
              type="button"
              onClick={close}
              className="ml-auto grid size-10 place-items-center rounded-full text-[var(--ink-2)] transition hover:bg-[var(--bg-2)] active:scale-95"
              aria-label="Close bag"
            >
              <X size={18} weight="bold" />
            </button>
          </header>

          {cart.lines.length === 0 ? (
            <div className="grid flex-1 place-content-center gap-4 p-8 text-center">
              <ShoppingBag size={36} className="mx-auto text-[var(--ink-3)]" />
              <p className="text-lg font-semibold">Your bag is empty</p>
              <Link href="/collections/all" onClick={close} className={`${textLink} justify-self-center`}>
                Browse coffee and merch
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-[var(--line)] overflow-y-auto px-5" aria-label="Items in your bag">
                {cart.lines.map((line) => {
                  const { product, variant } = variantsById.get(line.variantId)!;
                  return (
                    <li key={line.variantId} className="flex gap-4 py-5">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--bg-2)]">
                        <Image src={product.image} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="grid min-w-0 flex-1 gap-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold leading-snug">{product.name}</p>
                          <p className="whitespace-nowrap font-semibold">{formatPrice(variant.price * line.qty)}</p>
                        </div>
                        <p className="text-sm text-[var(--ink-2)]">
                          {variantLabel(variant)} · {formatPrice(variant.price)} each
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <div className="flex items-center rounded-full border border-[var(--line-strong)]" role="group" aria-label={`Quantity of ${product.name}`}>
                            <button
                              type="button"
                              onClick={() => dispatchCart({ type: "setQty", variantId: line.variantId, qty: line.qty - 1 })}
                              className="grid size-10 place-items-center rounded-full transition hover:bg-[var(--bg-2)]"
                              aria-label={`Decrease quantity of ${product.name}`}
                            >
                              <Minus size={14} weight="bold" />
                            </button>
                            <span className="min-w-8 text-center tabular-nums" aria-live="polite">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => dispatchCart({ type: "setQty", variantId: line.variantId, qty: line.qty + 1 })}
                              disabled={line.qty >= MAX_QTY}
                              className="grid size-10 place-items-center rounded-full transition hover:bg-[var(--bg-2)] disabled:opacity-40"
                              aria-label={`Increase quantity of ${product.name}`}
                            >
                              <Plus size={14} weight="bold" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => dispatchCart({ type: "remove", variantId: line.variantId })}
                            className="rounded-full px-2 py-2 text-sm text-[var(--ink-2)] underline underline-offset-4 hover:text-[var(--ink)]"
                            aria-label={`Remove ${product.name} from bag`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <footer className="grid gap-3 border-t border-[var(--line)] p-5">
                <div className="flex items-baseline justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums">{formatPrice(subtotal(cart))}</span>
                </div>
                <p className="text-sm text-[var(--ink-2)]">Taxes and shipping are calculated at checkout.</p>
                <a href={checkoutUrl(cart)} className={`${btnPrimary} w-full`}>
                  Checkout
                </a>
              </footer>
            </>
          )}
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

// Shown on the shop page, and anywhere once the bag has something in it.
export function BagButton() {
  const { openBag } = useBag();
  const count = itemCount(useCart());
  const onShop = usePathname().startsWith("/collections");
  if (count === 0 && !onShop) return null;
  return (
    <button
      type="button"
      onClick={openBag}
      className="relative grid size-10 shrink-0 place-items-center rounded-full transition hover:bg-[var(--accent-soft)] active:scale-95"
      aria-label={count ? `Bag, ${count} ${count === 1 ? "item" : "items"}` : "Bag, empty"}
    >
      <ShoppingBag size={22} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[11px] font-bold leading-5 text-[var(--accent-ink)]" aria-hidden>
          {count}
        </span>
      )}
    </button>
  );
}
