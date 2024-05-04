import type { Metadata } from "next";
import localFont from "next/font/local";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "~/components/navbar";
import { cn } from "~/lib/utils";

const fontSans = localFont({
  src: "../fonts/Hubot-Sans.woff2",
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bachitter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          defaultTheme="system"
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto max-w-2xl h-dvh py-4 px-6">
            <div className="mt-20" />
            {children}
            <footer className="fixed max-w-2xl w-full mx-auto bottom-0 bg-gradient-to-t from-background pt-8">
              <Navbar />
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
