import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { BookingProvider } from "@/components/shared/booking";
import { PaletteRoot } from "@/components/shared/prototype";
import { PeakFooter } from "@/directions/peak/Footer";
import { PeakHeader } from "@/directions/peak/Header";
import "@/directions/peak/peak.css";

const display = Bricolage_Grotesque({ variable: "--font-peak-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Hanken_Grotesk({ variable: "--font-peak-body", subsets: ["latin"] });

export default function PeakLayout({ children }: LayoutProps<"/v3-peak">) {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <PaletteRoot direction="v3-peak" native="dawn">
        <BookingProvider>
          <PeakHeader />
          <main>{children}</main>
          <PeakFooter />
        </BookingProvider>
      </PaletteRoot>
    </div>
  );
}
