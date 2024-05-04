import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";

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
  return (
    <nav className="bg-background w-full py-2 flex gap-2 justify-between items-center">
      <div className="flex gap-2">
        {linkItems.map((link) => (
          <Button variant="link" asChild key={link.href} className="p-0 h-auto">
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
