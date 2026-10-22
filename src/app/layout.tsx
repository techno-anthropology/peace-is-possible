import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { indexable, metadataBase } from "@/lib/seo";
import { BookingProvider } from "@/components/site/booking";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SiteStyles } from "@/components/site/site-styles";

const body = Figtree({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase,
  title: { default: site.name, template: `%s | ${site.shortName}` },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a1711",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} antialiased`}>
      <body>
        <SiteStyles />
        <BookingProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
