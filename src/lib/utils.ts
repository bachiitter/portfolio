import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
