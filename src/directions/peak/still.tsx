"use client";

import Image from "next/image";
import { usePalette } from "@/components/shared/prototype";

// The rendered dawn-ridge still that matches the active palette.
export function StillClient({ className = "-z-20 object-cover object-[50%_70%] opacity-80" }: { className?: string }) {
  const palette = usePalette();
  return (
    <>
      <Image src={`/peak/ridges-${palette}-portrait.webp`} alt="" fill sizes="100vw" className={`${className} md:hidden`} />
      <Image src={`/peak/ridges-${palette}.webp`} alt="" fill sizes="100vw" className={`${className} max-md:hidden`} />
    </>
  );
}
