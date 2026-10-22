import { CanopyHero } from "@/components/site/canopy-hero";
import { AppSection, Closing, CoachesTeaser, Explore, Intro, Podcast, Steps, Voices } from "@/components/site/home-sections";
import { JsonLd } from "@/components/site/blocks";
import { businessJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "/");

export default function Home() {
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
