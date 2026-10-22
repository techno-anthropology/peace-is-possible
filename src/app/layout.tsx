import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const body = Figtree({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.shortName}` },
  icons: { icon: site.logoMark },
  // Design prototypes: keep them out of search. Remove for production.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a1711",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
