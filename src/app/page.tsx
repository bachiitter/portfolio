import { EmailLink } from "~/components/email-link";
import { Button } from "~/components/ui/button";
import { projectsList } from "~/data/projects";

export default function Home() {
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
          <Button variant="link" className="p-0 h-auto text-foreground" asChild>
            <a target="_blank" rel="noreferrer" href="https://favite.co">
              favite
            </a>
          </Button>
          , a simple bookmarking app and doing a deep dive into backend engineering and infra.
        </p>
        <p className="text-muted-foreground">
          Get in touch via{" "}
          <Button variant="link" className="p-0 h-auto text-foreground" asChild>
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
              <h3>{project.name}</h3>
              <div className="flex justify-between gap-4">
                <p className="!mt-0 text-muted-foreground">{project.description}</p>

                <Button variant="link" className="p-0 h-auto text-foreground" asChild>
                  <a target="_blank" rel="noreferrer" href={project.link}>
                    visit
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
