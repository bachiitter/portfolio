import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "../../../../data";

export function generateStaticParams() {
  return allPosts.paths().map((pathname) => ({ slug: pathname }));
}

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata | undefined> {
  // biome-ignore lint/style/noNonNullAssertion: shut up
  const post = (await allPosts.get(`content/posts/${params.slug}`))!;

  if (!post) {
    return notFound();
  }

  return {
    title: post.frontMatter.title,
    description: post.frontMatter.description,
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      type: "article",
      publishedTime: post.frontMatter.date.toString(),
      url: `https://bachitter.dev/blog/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontMatter.title,
      description: post.frontMatter.description,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  // biome-ignore lint/style/noNonNullAssertion: shut up
  const post = (await allPosts.get(`content/posts/${params.slug}`))!;

  if (!post) {
    return notFound();
  }

  const { Content, frontMatter } = post;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  }).format(frontMatter.date);

  return (
    <main className="flex flex-col gap-10">
      <section className="flex flex-col">
        <h1>{frontMatter.title}</h1>
        <p className="text-sm text-muted-foreground !mt-0">
          <time>{formattedDate}</time> / <span>{post.readingTime?.average.minutes} min read</span>
        </p>
      </section>
      <article className="overflow-auto">
        {Content ? <Content renderTitle={false} /> : null}
      </article>
    </main>
  );
}
