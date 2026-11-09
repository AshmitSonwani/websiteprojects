import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Project Showcase`,
    template: `%s — ${site.showcaseName}`,
  },
  description: site.description,
  applicationName: site.showcaseName,
  authors: [{ name: site.name, url: site.officialUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "V3i Technology",
    "V3i Technology project showcase",
    "V3i Technology portfolio",
    "web development Kanpur",
    "custom web applications",
    "educational platforms",
    "school management software",
    "e-commerce development",
    "digital studio India",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.showcaseName,
    title: `${site.name} — Project Showcase`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Project Showcase`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04050a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-void text-white">
        <a
          href="#main"
          className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-white px-4 py-2 text-[0.8rem] font-medium text-void focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-violet"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <SiteHeader />

        <main id="main" className="relative">
          {children}
        </main>

        <SiteFooter />
        <CustomCursor />
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  );
}
