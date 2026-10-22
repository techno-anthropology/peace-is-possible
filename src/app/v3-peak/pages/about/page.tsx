import Image from "next/image";
import { BookButton } from "@/components/shared/booking";
import { coaches, story } from "@/content/site";
import { Trail } from "@/directions/peak/Trail";
import { ClosingCta, PageBand, btnPrimary } from "@/directions/peak/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("about", "/pages/about");

const ronnie = coaches.find((c) => c.id === "ronnie")!;

export default function StoryPage() {
  return (
    <>
      <PageBand title={story.h1}>
        <p className="font-display max-w-[48ch] text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.45] font-medium text-[var(--hero-ink)]">{story.opening}</p>
        <p className="mt-6 text-lg text-[var(--hero-ink-2)]">{story.invite}</p>
      </PageBand>

      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-2)]">
            <Image src={ronnie.photo} alt="Ronnie Sullivan" fill sizes="(min-width: 1024px) 28vw, 90vw" className="object-cover object-top" />
          </div>
          <p className="font-display mt-5 text-xl font-semibold">{ronnie.name}</p>
          <p className="text-[var(--ink-2)]">{ronnie.role}</p>
          <BookButton coach="ronnie" className={`${btnPrimary} mt-6`}>
            Book with Ronnie
          </BookButton>
        </aside>
        <Trail chapters={story.chapters} />
      </div>

      <ClosingCta body={story.invite}>
        <BookButton coach="ronnie" className={btnPrimary} />
      </ClosingCta>
    </>
  );
}
