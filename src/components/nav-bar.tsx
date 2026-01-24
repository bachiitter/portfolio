import { Link, linkOptions, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { INFO } from "$/lib/data";

const links = linkOptions([
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/writing",
    label: "Writing",
  },
  {
    to: "/photos",
    label: "Photos",
  },
]);

export function MainNav() {
  const router = useRouterState();
  const navRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // biome-ignore lint/correctness/useExhaustiveDependencies: router.location.pathname is needed for transition
  useEffect(() => {
    if (!navRef.current) return;

    const activeLink = navRef.current.querySelector('[data-status="active"]');
    if (!activeLink) return;

    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setIndicatorStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  }, [router.location.pathname]);

  return (
    <header className="sticky inset-x-0 top-0 isolate z-20 flex shrink-0 items-center gap-2 border-b border-border bg-background -mx-4">
      <nav className="px-4">
        <ul
          ref={navRef}
          className="flex h-(--header-height) w-full items-center justify-between relative gap-4"
        >
          <span
            className="absolute -bottom-[1px] h-px bg-accent transition-all duration-200 ease-in-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
          {links.map(({ label, ...item }) => (
            <li key={item.to}>
              <Link
                activeOptions={{ exact: true }}
                className="text-secondary hover:no-underline text-sm leading-[22px] tracking-normal relative before:absolute before:-inset-x-[7px] before:-inset-y-[14px] h-auto hover:text-primary data-[status=active]:text-accent"
                {...item}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${INFO.email}`}
              className="text-secondary hover:no-underline text-sm leading-[22px] tracking-normal relative before:absolute before:-inset-x-[7px] before:-inset-y-[14px] h-auto hover:text-primary data-[status=active]:text-accent"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
