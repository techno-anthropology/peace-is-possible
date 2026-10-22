import type { Metadata } from "next";
import { pageMeta, businessJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/blocks";
import { PondHero } from "@/directions/water/hero/PondHero";
import { PauseMoment } from "@/directions/water/PauseMoment";
import { AppSection, ArticlesTeaser, ClosingCta, CoachesTeaser, CoffeeTeaser, Intro, Podcast, Steps, TestimonialRow } from "@/directions/water/HomeSections";

export const metadata: Metadata = pageMeta("home", "/");

export default function WaterHome() {
  return (
    <>
      <JsonLd data={businessJsonLd} />
      <PondHero />
      <Intro />
      <Steps />
      <CoachesTeaser />
      <PauseMoment />
      <TestimonialRow />
      <AppSection />
      <Podcast />
      <CoffeeTeaser />
      <ArticlesTeaser />
      <ClosingCta />
    </>
  );
}
