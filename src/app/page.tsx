import { EmailLink } from "~/components/email-link";
import { Button } from "~/components/ui/button";
import { projectsList } from "~/data/projects";
import { formatDate } from "~/lib/utils";
import { allPosts } from "../../data";

export default function Home() {
  const filteredPosts = allPosts
    .all()
    .slice(0, 8)
    .filter((post) => !post.frontMatter.draft);

  return (
    <main className="flex flex-col gap-10">
      <section className="flex flex-col">
        <h1>Bachitter</h1>
        <p className="!mt-0 text-muted-foreground">Product Engineer</p>
        <p className="text-muted-foreground">
          Hi! I am Bachitter Chahal, a Product Engineer based in Vancouver, Canada. I love building
          and breaking things. Everything I have learned has been taught by my curiosity about{" "}
          <span className="font-bold">how</span> and <span className="font-bold">why</span> things
          work the way they work.
        </p>
        <p className="text-muted-foreground">
          Currently, I am building{" "}
          <Button variant="link" className="p-0 h-auto" asChild>
            <a target="_blank" rel="noreferrer" href="https://favite.co">
              favite
            </a>
          </Button>
          , a simple bookmarking app and doing a deep dive into backend engineering and infra.
        </p>
        <p className="text-muted-foreground">
          Get in touch via{" "}
          <Button variant="link" className="p-0 h-auto" asChild>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/bachiitter">
              twitter
            </a>
          </Button>{" "}
          or <EmailLink />.
        </p>
      </section>
      <section className="flex flex-col gap-6">
        <h2>Work</h2>
        <div className="flex flex-col gap-6">
          {projectsList.map((project) => (
            <div key={project.name}>
              <div className="flex justify-between items-center gap-4">
                <h3 className="!mt-0">{project.name}</h3>

                <Button variant="link" className="p-0 h-auto" asChild>
                  <a target="_blank" rel="noreferrer" href={project.link}>
                    visit
                  </a>
                </Button>
              </div>

              <p className="!mt-0 text-muted-foreground">{project.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <h2>Posts</h2>
        <div>
          {filteredPosts.length > 0 ? (
            <div className="flex flex-col gap-6">
              {filteredPosts.map((post) => (
                <a key={post.pathname} href={post.pathname}>
                  <div className="flex gap-6 justify-between items-center">
                    {" "}
                    <h3 className="!mt-0">{post.frontMatter.title}</h3>
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
        </div>
      </section>
    </main>
  );
}
