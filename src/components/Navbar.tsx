"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";
import { Home, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/Button";

const navItems = [
  {
    id: 1,
    href: "/",
    label: "Home",
    icon: <Home className="stroke-foreground" />,
  },
  /** {
    id: 2,
    href: "/about",
    label: "About",
    icon: <User className="stroke-foreground" />,
  } */
];

export function NavBar() {
  const { setTheme, theme } = useTheme();

  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <nav className=" mx-auto flex w-auto items-center">
      <ul className="mx-auto flex w-auto gap-x-2 rounded-[36px] bg-muted px-2.5 py-2.5">
        {navItems.map((item) => {
          const isActive = item.href === pathname;
          return (
            <li key={item.id}>
              <Button
                className={cn(
                  "relative h-11 w-11 rounded-full bg-border p-3 hover:bg-border/60",
                  isActive && "bg-background/70"
                )}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
                asChild>
                <Link href={item.href} aria-label={item.label}>
                  {item.icon}
                </Link>
              </Button>
            </li>
          );
        })}
        <li>
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
              "h-11 w-11 rounded-full bg-border p-3 hover:bg-border/60"
            )}>
            <Sun className="rotate-0 scale-100 stroke-foreground transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute rotate-90 scale-0 stroke-foreground transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
