import Link from "next/link";

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
    <nav className="bg-background w-full py-2 flex gap-2">
      {linkItems.map((link) => (
        <Link href={link.href} key={link.href}>
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
