export interface Social {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  desc: string;
  status: "Active" | "Archived" | "Beta" | "Soon";
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  date: string;
}

export const routes = [
  { path: "/", label: "Projects" },
  { path: "/writing", label: "Writing" },
  { path: "/experience", label: "Experience" },
  { path: "/photos", label: "Photos" },
] as const;
