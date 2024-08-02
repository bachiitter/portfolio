import type { Metadata } from "next";
import localFont from "next/font/local";
import "~/styles/globals.css";
import { PackageInstallStylesAndScript } from "mdxts/components/PackageInstall";
import { ThemeProvider } from "next-themes";
import { Navbar } from "~/components/navbar";
import { getSiteMetadata } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { PostHogProvider } from "./providers";

const fontSans = localFont({
  src: "../fonts/Hubot-Sans.woff2",
  display: "swap",
  variable: "--font-sans",
});

export function generateMetadata(): Metadata {
  const siteMetadata = getSiteMetadata();
  return {
    ...siteMetadata,
    alternates: {
      canonical: "https://bachitter.dev",
      types: {
        "application/rss+xml": "https://bachitter.dev/rss.xml",
      },
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>
      <PostHogProvider>
      <body className={cn("min-h-dvh bg-background font-sans antialiased", fontSans.variable)}>
        <PackageInstallStylesAndScript />
        <ThemeProvider
          defaultTheme="system"
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto max-w-xl h-dvh py-4 px-6">
            <div className="mt-20" />

            {children}
            <div className="pb-20" />
            <footer className="fixed max-w-xl w-full mx-auto bottom-0 left-0 right-0 px-6 bg-gradient-to-t from-background to-85% pt-10">
              <Navbar />
            </footer>
          </div>
        </ThemeProvider>
      </body>
      </PostHogProvider>
    </html>
  );
}
