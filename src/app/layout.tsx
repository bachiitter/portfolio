import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";

import { Inter as FontSans } from "next/font/google";
import Link from "next/link";

import { cn } from "@/utils/cn";

import { BackgroundGrid } from "@/components/GridPattern";
import { NavBar } from "@/components/Navbar";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: {
    default: "bachitter",
    template: "%s - bachitter",
  },
  description: "FullStack Web Developer based in Vancouver,BC.",
  openGraph: {
    title: "Bachitter",
    description: "FullStack Web Developer based in Vancouver,BC.",
    url: "https://bachitter.dev",
    siteName: "bachitter",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "bachitter",
    description: "FullStack Web Developer based in Vancouver,BC.",
    card: "summary_large_image",
    creator: "@bachiitter",
  },
  icons: {
    shortcut: "/favicon.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body
        className={cn(
          "scrollbar-hide bg-background font-sans",
          fontSans.variable
        )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundGrid>
            <main className="scrollbar-hide top-0 flex min-h-screen min-w-full flex-col self-start px-6 pb-6 font-sans antialiased md:sticky md:px-10 lg:overflow-hidden lg:px-20">
              <header className="sticky top-0 z-50 flex w-full max-w-2xl justify-between pb-20 pt-6 md:pb-28 md:pt-12">
                <Link href="/" className="flex flex-col items-start">
                  <p className="text-2xl font-bold">bachitter</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    30.4864° N, 75.6455° E
                  </p>
                </Link>
              </header>
              {children}
            </main>
            <footer className="fixed inset-x-0 bottom-12">
              <NavBar />
            </footer>
          </BackgroundGrid>
        </ThemeProvider>
      </body>
    </html>
  );
}
