import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

const options = [
  {
    href: "/v1-canopy",
    name: "Canopy",
    palette: "Deep forest",
    idea: "Light falls through a forest canopy and leaves drift as you scroll. The closest to Calm.",
    shot: "/previews/v1-canopy.webp",
  },
  {
    href: "/v2-water",
    name: "Still water",
    palette: "Morning sage",
    idea: "A pond surface that ripples under your cursor or finger. Built around noticing and mindfulness.",
    shot: "/previews/v2-water.webp",
  },
  {
    href: "/v3-peak",
    name: "Peak",
    palette: "Forest to light",
    idea: "Pikes Peak at dawn. Scrolling moves you forward through mist and mountain layers, then opens into light.",
    shot: "/previews/v3-peak.webp",
  },
];

export default function Hub() {
  return (
    <main className="palette-root min-h-[100dvh] px-4 py-14 md:px-10 md:py-20" data-palette="forest">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <Image src={site.logoMark} alt="" width={56} height={56} className="size-12 md:size-14" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Peace is Possible redesign</h1>
            <p className="text-[var(--ink-2)]">Three directions. Same content, different ideas.</p>
          </div>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {options.map((o) => (
            <li key={o.href}>
              <Link
                href={o.href}
                className="group block overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--accent)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-2)]">
                  <Image src={o.shot} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-left-top transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <p className="text-lg font-semibold">{o.name}</p>
                  <p className="text-sm text-[var(--accent)]">{o.palette}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{o.idea}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm text-[var(--ink-2)]">
          Every direction has a Prototype button at the bottom of the screen. Use it to switch directions or preview the other two palettes.
        </p>
      </div>
    </main>
  );
}
