export const NAVIGATION: Array<{
  label: string;
  slug: string;
}> = [
  {
    label: "about",
    slug: "/",
  },
  {
    label: "blog",
    slug: "/blog",
  },
  //{
  // label: "photos",
  // slug: "/photos",
  //},
];

export const SOCIALS: Array<{
  label: string;
  handle: string;
  url: string;
}> = [
  {
    label: "email",
    handle: "bachitter@pm.me",
    url: "mailto:bachiitter@pm.me",
  },
  {
    label: "github",
    handle: "bachiitter",
    url: "https://github.com/bachiitter",
  },
  {
    label: "twitter",
    handle: "@bachiitter",
    url: "https://x.com/bachiitter",
  },
] as const;

export const PROJECTS: Array<{
  name: string;
  description: string;
  link: string;
}> = [
  {
    name: "bachitter.dev",
    description: "my personal website and blog",
    link: "https://github.com/bachiitter/portfolio",
  },
  {
    name: "favite",
    description: "a simple bookmarking app",
    link: "#",
  },
];