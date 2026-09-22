import { Geist, Geist_Mono, Newsreader } from "next/font/google";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { createMetadata, personJsonLd } from "@/lib/seo";

import "@/styles/globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = createMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <style>{`
          :root {
            --font-display: var(--font-newsreader), "Iowan Old Style", Palatino, serif;
            --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
            --font-mono: var(--font-geist-mono), ui-monospace, monospace;
          }
        `}</style>
      </head>
      <body>
        <ThemeProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
