import type { Experience, Project, Social } from "../types";

export const INFO = {
  avatarImage: "https://pbs.twimg.com/profile_images/2014842071358521344/bXAVoW42_400x400.jpg",
  name: "Bachitter Chahal",
  descrition: "Hi! I am Bachitter Chahal, a Product Engineer based in Barnala, India.",
  intro: `I'm a product engineer, currently building`,
  currentProjects: [
    {
      name: "GetDigest",
      link: "#",
    },
    {
      name: "Lumier",
      link: "https://github.com/bachiitter/lumier",
    },
  ],
  city: "Barnala, India",
  work: "Available for full-time roles",
  aboutMe: "",
  email: "me@bachitter.dev",
};

export const PROJECTS: Array<Project> = [
  {
    title: "Orphos Design System",
    desc: "A modern React UI component library built on Base UI and Tailwind CSS v4.",
    link: "https://github.com/theasterism/ui",
    tags: ["Open Source", "React", "Base UI", "Tailwind CSS V4", "TypeScript"],
  },
  {
    title: "Sekhon Kennel",
    desc: "A web application for Sekhon Dog Kennel to manage dog inventory, sales, and business operations.",
    tags: [
      "Open Source",
      "React",
      "Tanstack Start",
      "Tailwind CSS V4",
      "shadcn/ui",
      "tRPC",
      "Drizzle ORM",
      "SQLite",
      "Cloudflare R2",
      "TypeScript",
      "Cloudflare Workers",
    ],
    link: "https://github.com/theasterism/sekhon-dog-kennel",
  },
  {
    title: "Portfolio",
    desc: "A web application for Sekhon Dog Kennel to manage dog inventory, sales, and business operations.",
    tags: [
      "Open Source",
      "React",
      "Tanstack Start",
      "Tailwind CSS V4",
      "TypeScript",
      "Cloudflare Workers",
    ],
    link: "https://github.com/bachiitter/portfolio",
  },
  {
    title: "GetDigest",
    desc: "A distraction-free RSS reader. Save articles, follow feeds, read when ready.",
    tags: [
      "React",
      "Tanstack Router",
      "Tailwind CSS V4",
      "Vite",
      "Hono",
      "tRPC",
      "PostgreSQL",
      "Microservices",
      "Monorepo",
      "SST",
      "Pulumi",
      "Cloudflare R2",
      "Resend",
      "Cloudflare Workers",
    ],
  },
];

export const EXPERIENCE: Array<Experience> = [];

export const LINKS: Array<Social> = [
  {
    label: "GitHub",
    url: "https://github.com/bachiitter",
  },
  {
    label: "Twitter/X",
    url: "https://x.com/bachiitter",
  },
  {
    label: "RSS",
    url: "/rss.xml",
  },
] as const;
