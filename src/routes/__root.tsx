import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles/globals.css?url";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import { MainNav } from "$/components/nav-bar";
import { INFO, LINKS } from "$/lib/data";
import { metadata } from "$/lib/utils";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...metadata({
        title: INFO.name,
        description: INFO.descrition,
      }),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon.png",
      },
      // { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body
        className=""
        style={
          {
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <div className="flex flex-col gap-12 container">
          <MainNav />
          <main className="flex-1">{children}</main>
          <footer className="flex gap-8 xs:gap-4 xs:justify-between flex-col xs:flex-row xs:items-center text-[15px] leading-[24px] tracking-normal text-secondary pb-4">
            <div className="flex items-center gap-2">
              {LINKS.map((item) => (
                <a
                  className="text-sm leading-[22px] tracking-normal link"
                  href={item.url}
                  key={item.url}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <span className="text-[12px] leading-[21px] tracking-[0.0075em] text-secondary">
              © {new Date().getFullYear()} {INFO.name.split(" ")[0]}
            </span>
          </footer>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
