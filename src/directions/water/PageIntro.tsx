import Image from "next/image";

// Inner-page header: title and lede on the left, a slim band of still water
// below that ties every page back to the pond.
export function PageIntro({
  title,
  lede,
  children,
  image = "/water/wide-lake.webp",
}: {
  title: string;
  lede?: string;
  children?: React.ReactNode;
  image?: string;
}) {
  return (
    <header className="mx-auto max-w-[1400px] px-4 pt-28 md:px-8 md:pt-36">
      <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.025em] md:text-6xl">{title}</h1>
      {lede && <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[var(--ink-2)] md:text-xl">{lede}</p>}
      {children && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{children}</div>}
      <div className="relative mt-12 h-36 overflow-hidden rounded-[var(--radius-lg)] md:mt-16 md:h-56">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-[50%_58%]" />
        <div className="absolute inset-0 bg-[var(--bg)]/15" />
      </div>
    </header>
  );
}

export const primaryBtn =
  "rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98]";

export const textLink =
  "inline-flex items-center gap-1.5 font-medium text-[var(--ink)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] hover:decoration-[3px]";
