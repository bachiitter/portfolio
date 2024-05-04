import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "reshaped/themes/reshaped/theme.css";
import { App } from "~/components/App";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
