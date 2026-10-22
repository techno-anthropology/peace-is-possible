import { Figtree } from "next/font/google";
import { PaletteRoot } from "@/components/shared/prototype";
import { BookingProvider } from "@/components/shared/booking";
import { Header } from "@/directions/canopy/ui/header";
import { Footer } from "@/directions/canopy/ui/footer";
import { CanopyStyles } from "@/directions/canopy/canopy-styles";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-canopy" });

export default function CanopyLayout({ children }: LayoutProps<"/v1-canopy">) {
  return (
    <PaletteRoot direction="v1-canopy" native="forest" className={`${figtree.variable} ${figtree.className}`}>
      <CanopyStyles />
      <BookingProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </BookingProvider>
    </PaletteRoot>
  );
}
