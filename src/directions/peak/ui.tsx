import Image from "next/image";
import { StillClient } from "./still";

// Server-safe building blocks shared by Peak pages.

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-semibold whitespace-nowrap text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98]";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-medium whitespace-nowrap text-[var(--ink)] ring-1 ring-[var(--line-strong)] transition hover:ring-[var(--ink)] active:scale-[0.98]";

// Dark band at the top of inner pages: the same dawn ridges as the home hero,
// so every page opens in the mountains and steps down into light.
export function PageBand({
  title,
  lede,
  children,
  image,
}: {
  title: string;
  lede?: string;
  children?: React.ReactNode;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--hero-bg)] text-[var(--hero-ink)]">
      <BandImage src={image} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color-mix(in_srgb,var(--hero-bg)_75%,transparent)] via-[color-mix(in_srgb,var(--hero-bg)_45%,transparent)] to-[color-mix(in_srgb,var(--hero-bg)_85%,transparent)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-b from-transparent to-[var(--bg)] md:h-28" />
      <div className="mx-auto max-w-[1400px] px-4 pt-32 pb-28 md:px-10 md:pt-44 md:pb-40">
        <h1 className="font-display max-w-[20ch] text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] font-semibold tracking-[-0.03em]">{title}</h1>
        {lede && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-[var(--hero-ink-2)]">{lede}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

function BandImage({ src }: { src?: string }) {
  return src ? (
    <Image src={src} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-70" />
  ) : (
    <StillClient />
  );
}

export function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-semibold tracking-[-0.025em] ${className}`}>{children}</h2>;
}

// Dark closing band with the ridge still, used at the foot of inner pages.
export function ClosingCta({ title = "Peace is possible.", body, children }: { title?: string; body?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--hero-bg)] text-[var(--hero-ink)]">
      <StillClient className="-z-20 object-cover object-[50%_60%] opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--hero-bg)]" />
      <div className="mx-auto grid min-h-[60svh] max-w-[1400px] content-end gap-6 px-4 pt-40 pb-16 md:px-10 md:pb-20">
        <h2 className="font-display max-w-[14ch] text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.035em]">{title}</h2>
        {body && <p className="max-w-[52ch] text-lg leading-relaxed text-[var(--hero-ink-2)]">{body}</p>}
        <div className="flex flex-wrap items-center gap-4">{children}</div>
      </div>
    </section>
  );
}
