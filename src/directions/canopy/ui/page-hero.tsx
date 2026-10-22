import Image from "next/image";
import { container } from "./styles";

// Inner-page header: headline and lede over a soft canopy band that fades into the page.
export function PageHero({
  title,
  lede,
  image = "/canopy/canopy-green.webp",
  children,
}: {
  title: string;
  lede?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-[0.22]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color-mix(in_srgb,var(--bg)_55%,transparent)] to-[var(--bg)]" />
      <div className={container}>
        <h1 className="max-w-[20ch] text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] md:text-6xl lg:text-7xl">{title}</h1>
        {lede && <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-[var(--ink-2)] md:text-xl">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
