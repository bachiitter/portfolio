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
  const isInitializedRef = useRef(false);
  const [enableTransition, setEnableTransition] = useState(false);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;

      const currentPath = router.location.pathname;
      const activeLinkData = links.find((link) => link.to === currentPath);
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

    if (!isInitializedRef.current) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          updateIndicator();
          requestAnimationFrame(() => {
            isInitializedRef.current = true;
            setEnableTransition(true);
          });
        });
      });
    } else {
      updateIndicator();
    }
  }, [router.location.pathname]);

  return (
    <header className="sticky inset-x-0 top-0 isolate z-20 flex shrink-0 items-center gap-2 border-b border-border bg-background -mx-4">
      <nav className="px-4">
        <ul
          ref={navRef}
          className="flex h-(--header-height) w-full items-center justify-between relative gap-4"
        >
          <span
            className={`absolute -bottom-[1px] h-px bg-accent ease-in-out ${enableTransition ? "transition-all duration-200" : ""}`}
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
          {links.map(({ label, ...item }) => (
            <li key={item.to}>
              <Link
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
