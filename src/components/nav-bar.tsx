import { Link, linkOptions, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { INFO } from "$/lib/data";

export const NAV_LINKS = linkOptions([
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
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(
    null,
  );
  const [enableTransition, setEnableTransition] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updateIndicator = () => {
      if (!navRef.current) return;

      const currentPath = router.location.pathname;
      const activeLinkData = NAV_LINKS.find((link) => link.to === currentPath);
      if (!activeLinkData) return;

      const activeLink = navRef.current.querySelector(`a[href="${activeLinkData.to}"]`);
      if (!activeLink) return;

      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    };

    if (!enableTransition) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          updateIndicator();
          requestAnimationFrame(() => {
            setEnableTransition(true);
          });
        });
      });
    } else {
      updateIndicator();
    }
  }, [router.location.pathname, isMounted, enableTransition]);

  return (
    <header className="sticky inset-x-0 top-0 isolate z-20 flex shrink-0 items-center gap-2 border-b border-border bg-background -mx-4">
      <nav className="px-4">
        <ul
          ref={navRef}
          className="flex h-(--header-height) w-full items-center justify-between relative gap-4"
        >
          {indicatorStyle && (
            <span
              className={`absolute -bottom-px h-px bg-accent ease-in-out ${enableTransition ? "transition-all duration-200" : ""}`}
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />
          )}
          {NAV_LINKS.map(({ label, ...item }) => (
            <li key={item.to}>
              <Link
                className="text-secondary hover:no-underline text-sm leading-5.5 tracking-normal relative before:absolute before:-inset-x-1.75 before:-inset-y-3.5 h-auto hover:text-primary data-[status=active]:text-accent"
                {...item}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${INFO.email}`}
              className="text-secondary hover:no-underline text-sm leading-5.5 tracking-normal relative before:absolute before:-inset-x-1.75 before:-inset-y-3.5 h-auto hover:text-primary data-[status=active]:text-accent"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
