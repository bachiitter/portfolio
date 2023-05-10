import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Bachitter",
    template: "%s - Bachitter"
  },
  description: "FullStack Web Developer based in Vancouver,BC.",
  openGraph: {
    title: "Bachitter",
    description: "FullStack Web Developer based in Vancouver,BC.",
    url: "https://bachitter.dev",
    siteName: "Bachitter",
    locale: "en-US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "Bachitter",
    description: "FullStack Web Developer based in Vancouver,BC.",
    card: "summary_large_image",
    creator: "@bachiitter"
  },
  icons: {
    shortcut: "/favicon.io",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto antialiased`}>{children}</body>
    </html>
  );
}
