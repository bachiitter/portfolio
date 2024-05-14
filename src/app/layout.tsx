import type { Metadata } from "next";
import localFont from "next/font/local";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "~/components/navbar";
import { cn } from "~/lib/utils";
import { getSiteMetadata } from "~/lib/constants";

const fontSans = localFont({
  src: "../fonts/Hubot-Sans.woff2",
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = getSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-dvh bg-background font-sans antialiased", fontSans.variable)}>
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
            <footer className="fixed max-w-xl w-full mx-auto bottom-0 left-0 right-0 px-6 bg-gradient-to-t from-background pt-10">
              <Navbar />
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
