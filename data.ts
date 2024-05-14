import { createSource } from "mdxts";

type FrontMatter = {
  title: string;
  description?: string;
  date: Date;
  draft: boolean;
};

export const allPosts = createSource<{
  frontMatter: FrontMatter;
}>("content/blog/*.mdx", {
  sort: (a, b) => b.frontMatter.date.getTime() - a.frontMatter.date.getTime(),
  baseDirectory: "content",
  basePathname: "",
});
