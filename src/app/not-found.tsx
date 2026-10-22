import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { nav } from "@/content/site";
import { BookButton } from "@/components/site/booking";
import { PageHero } from "@/components/site/page-hero";
import { btnPrimary, container, textLink } from "@/components/site/styles";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Peace is Possible" },
  description: "This page may have moved when the site was rebuilt.",
};

export default function NotFound() {
  return (
    <>
      <PageHero title="This page isn't here" lede="It may have moved when the site was rebuilt. These are good places to start.">
        <BookButton className={`${btnPrimary} mt-9`} />
      </PageHero>
      <nav aria-label="Pages" className={container}>
        <ul className="grid gap-4 border-t border-[var(--line)] pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {[{ slug: "/", label: "Home" }, ...nav].map((n) => (
            <li key={n.slug}>
              <Link href={n.slug} className={textLink}>
                {n.label} <ArrowRight size={16} weight="bold" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
