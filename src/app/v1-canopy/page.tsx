import { CanopyHero } from "@/directions/canopy/hero/canopy-hero";
import { AppSection, Closing, CoachesTeaser, Explore, Intro, Podcast, Steps, Voices } from "@/directions/canopy/home/sections";
import { JsonLd } from "@/components/shared/blocks";
import { businessJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "/");

export default function CanopyHome() {
  return (
    <>
      <JsonLd data={businessJsonLd} />
      <CanopyHero />
      <Intro />
      <Steps />
      <CoachesTeaser />
      <Voices />
      <AppSection />
      <Podcast />
      <Explore />
      <Closing />
    </>
  );
}
