import { BookingProvider } from "@/components/shared/booking";
import { Header } from "@/directions/canopy/ui/header";
import { Footer } from "@/directions/canopy/ui/footer";
import { CanopyStyles } from "@/directions/canopy/canopy-styles";

export default function CanopyLayout({ children }: LayoutProps<"/v1-canopy">) {
  return (
    <>
      <CanopyStyles />
      <BookingProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </BookingProvider>
    </>
  );
}
