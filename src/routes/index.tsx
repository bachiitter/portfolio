import { Accordion } from "@base-ui/react/accordion";
import { BriefcaseIcon, LinkIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { createFileRoute } from "@tanstack/react-router";
import { INFO, PROJECTS } from "$/lib/data";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <img
          src={INFO.avatarImage}
          alt="Bachitter's Avatar"
          fetchPriority="high"
          className="size-12 rounded-full bg-accent"
        />
        <h1 className="text-[32px] font-medium leading-10.5 tracking-[-0.01em]">{INFO.name}</h1>
      </div>
      <p className="text-[15px] leading-6.5 tracking-normal">
        <span>{INFO.intro}</span>{" "}
        <span className="text-accent">{INFO.currentProjects[0]?.name}</span>.
      </p>
      <ul className="flex flex-col gap-1 text-secondary text-[15px] leading-6.5 tracking-normal [&_li]:flex [&_li]:items-start [&_li]:gap-2">
        <li>
          <MapPinIcon className="size-4 shrink-0 mt-1" /> {INFO.city}
        </li>
        <li>
          <BriefcaseIcon className="size-4 shrink-0 mt-1" /> {INFO.work}
        </li>
      </ul>
      <p className="text-[15px] leading-6.5 tracking-normal text-secondary">{INFO.aboutMe}</p>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium leading-8 tracking-[-0.0075em]">Projects</h2>
        <Accordion.Root className="flex flex-col">
          {PROJECTS.map((project) => (
            <Accordion.Item
              key={project.title}
              className="border-t border-t-border -mx-4 last:border-b last:border-b-border"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex gap-4 items-center justify-between w-full p-4 hover:bg-background-secondary">
                  <span className="text-base font-medium leading-6.25 tracking-normal">
                    {project.title}
                  </span>
                  {project.link ? (
                    <a
                      className="link relative before:absolute before:-inset-1.75"
                      href={project.link}
                      target="blank"
                      rel="noopener noreferrer"
                      aria-label={project.title}
                    >
                      <LinkIcon className="size-4 shrink-0" />{" "}
                    </a>
                  ) : null}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="grid transition-[grid-template-rows] duration-200 ease-out data-ending-style:grid-rows-[0fr] data-starting-style:grid-rows-[0fr] grid-rows-[1fr] border-t border-t-border">
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-4 p-4">
                    <p className="text-[15px] leading-6.5 tracking-normal text-secondary">
                      {project.desc}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.tags.map((item) => (
                        <span
                          className="text-[12px] leading-5.25 tracking-[0.0075em] text-secondary bg-background-secondary px-1.5 py-px border border-border/50"
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium leading-8 tracking-[-0.0075em]">Experience</h2>
        <p className="text-secondary text-sm leading-5.5 tracking-normal">No experience yet</p>
      </div>
    </section>
  );
}
