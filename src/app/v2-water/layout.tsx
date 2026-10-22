import { Manrope } from "next/font/google";
import { PaletteRoot } from "@/components/shared/prototype";
import { BookingProvider } from "@/components/shared/booking";
import { Header } from "@/directions/water/Header";
import { Footer } from "@/directions/water/Footer";
import "@/directions/water/water.css";

const manrope = Manrope({ variable: "--font-water", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function WaterLayout({ children }: LayoutProps<"/v2-water">) {
  return (
    <div className={manrope.variable}>
      <PaletteRoot direction="v2-water" native="sage">
        <BookingProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </BookingProvider>
      </PaletteRoot>
    </div>
  );
}
