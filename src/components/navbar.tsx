"use client";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";

const linkItems: Array<{
  name: string;
  href: Route;
}> = [
  {
    name: "about",
    href: "/",
  },
  {
    name: "blog",
    href: "/blog",
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-t from-background to-85%  w-full pb-4 md:pb-2 pt-10 flex gap-2 justify-between items-center">
      <div className="flex gap-2">
        {linkItems.map((link) => (
          <Button
            variant="link"
            asChild
            key={link.href}
            className={cn("p-0 h-auto", pathname === link.href ? "" : "text-muted-foreground")}
          >
            <Link href={link.href}>{link.name}</Link>
          </Button>
        ))}
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
