import type { Experience, Project, Social } from "../types";

export const INFO = {
  name: "Bachitter Chahal",
  title: "Software Engineer",
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

export const PHOTOS: Array<string> = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&fit=crop&q=80",
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&fit=crop",
  "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=1000&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&fit=crop",
];
