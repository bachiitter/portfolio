"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

const linkItems: Array<{
  name: string;
  href: string;
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
    <nav className="bg-background w-full py-2 flex gap-2 justify-between items-center">
      <div className="flex gap-2">
        {linkItems.map((link) => (
          <Button
            variant="link"
            asChild
            key={link.href}
            className={cn(
              "p-0 h-auto",
              pathname === link.href ? "text-primary-foreground" : "text-muted-foreground",
            )}
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
