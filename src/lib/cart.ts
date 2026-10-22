"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { variantsById } from "@/content/products";

export type CartLine = { variantId: number; qty: number };
export type Cart = { lines: CartLine[] };

export type CartAction =
  | { type: "add"; variantId: number; qty: number }
  | { type: "setQty"; variantId: number; qty: number }
  | { type: "remove"; variantId: number }
  | { type: "clear" };

const EMPTY: Cart = { lines: [] };
export const MAX_QTY = 99;
const clampQty = (qty: number) => Math.min(MAX_QTY, Math.max(0, Math.floor(qty)));

export function cartReducer(cart: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "add": {
      const existing = cart.lines.find((l) => l.variantId === action.variantId);
      if (existing) return cartReducer(cart, { type: "setQty", variantId: action.variantId, qty: existing.qty + action.qty });
      const qty = clampQty(action.qty);
      return qty > 0 ? { lines: [...cart.lines, { variantId: action.variantId, qty }] } : cart;
    }
    case "setQty": {
      const qty = clampQty(action.qty);
      return {
        lines: qty === 0 ? cart.lines.filter((l) => l.variantId !== action.variantId) : cart.lines.map((l) => (l.variantId === action.variantId ? { ...l, qty } : l)),
      };
    }
    case "remove":
      return { lines: cart.lines.filter((l) => l.variantId !== action.variantId) };
    case "clear":
      return EMPTY;
  }
}

// Shopify cart permalink: the store builds a cart from these lines and sends
// the visitor to checkout. Works from any origin, no API token needed.
export const checkoutUrl = (cart: Cart) => `${site.store}/cart/${cart.lines.map((l) => `${l.variantId}:${l.qty}`).join(",")}`;

export const itemCount = (cart: Cart) => cart.lines.reduce((n, l) => n + l.qty, 0);

export const subtotal = (cart: Cart) => cart.lines.reduce((sum, l) => sum + (variantsById.get(l.variantId)?.variant.price ?? 0) * l.qty, 0);

const STORAGE_KEY = "pip-cart";

// Stored carts are untrusted: drop malformed lines and variants that are no
// longer sold (the product list is refreshed from Shopify).
function parse(raw: string | null): Cart {
  if (!raw) return EMPTY;
  try {
    const data: unknown = JSON.parse(raw);
    const lines = (data as Cart)?.lines;
    if (!Array.isArray(lines)) return EMPTY;
    return {
      lines: lines
        .filter((l): l is CartLine => Number.isSafeInteger(l?.variantId) && Number.isSafeInteger(l?.qty) && l.qty > 0)
        .filter((l) => variantsById.has(l.variantId))
        .map((l) => ({ variantId: l.variantId, qty: clampQty(l.qty) })),
    };
  } catch {
    return EMPTY;
  }
}

let current: Cart | null = null;
const listeners = new Set<() => void>();

function read(): Cart {
  if (current) return current;
  try {
    current = parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    current = EMPTY;
  }
  return current;
}

export function dispatchCart(action: CartAction) {
  current = cartReducer(read(), action);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    current = parse(e.newValue);
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// The server and first client render see an empty cart; the stored one
// appears right after hydration.
export function useCart(): Cart {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
