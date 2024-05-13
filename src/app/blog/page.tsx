import { formatDate } from "~/lib/utils";
import { allPosts } from "../../../data";

export const metadata = {
  title: "Blog",
  description: "A collection of my writings, rants and incomplete notes.",
};

export default function Blog() {
  const filteredPosts = allPosts.all().filter((post) => !post.frontMatter.draft);
  return (
    <main className="flex flex-col gap-10">
      <section>
        <h1>Blog</h1>
        <p className="text-muted-foreground !mt-0">
          A collection of my writings, rants and incomplete notes.
        </p>
      </section>
      <section>
        {filteredPosts.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredPosts.map((post) => (
              <a key={post.label} href={`blog/${post.label}`}>
                <div className="flex gap-6 justify-between">
                  {" "}
                  <h3>{post.frontMatter.title}</h3>
                  <span className="text-muted-foreground text-sm">
                    {formatDate(post.frontMatter.date)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm !mt-0 pr-[32px]">
                  {post.frontMatter.description}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <p className="">Nothing to see here!</p>
        )}
      </section>
    </main>
  );
}
