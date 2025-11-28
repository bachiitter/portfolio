import type { Experience, Project, Social } from "../types";

export const INFO = {
  name: "Bachitter Chahal",
  title: "Engineer",
  intro: `I build stuff for fun. I may have written just one app like 5 times. Currently I'm building GetDigest - RSS Reader(It's complicated).`,
  email: "me@bachitter.dev",
};

export const PROJECTS: Array<Project> = [
  {
    title: "Orphos Design System",
    desc: "A collection of components and UI elements.",
    tech: [],
    status: "Soon",
    link: "https://github.com/theasterism/ui",
  },
  {
    title: "GetDigest",
    desc: "Overengineered RSS Reader",
    tech: [],
    status: "Soon",
  },
];

export const EXPERIENCE: Array<Experience> = [];

export const SOCIALS: Array<Social> = [
  {
    label: "GitHub",
    url: "https://github.com/bachiitter",
  },
  {
    label: "Twitter/X",
    url: "https://x.com/bachiitter",
  },
  {
    label: "Bluesky",
    url: "https://bsky.app/profile/bachitter.dev",
  },
] as const;
