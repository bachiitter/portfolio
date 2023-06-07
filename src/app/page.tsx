import { cn } from "@/utils/cn";
import { Balancer } from "react-wrap-balancer";

import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { ProfileImage } from "@/components/ProfileImage";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const skills: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Golang",
  "TailwindCSS",
  "Cloudflare",
  "tRPC",
  "Prisma",
  "Planetscale",
  "Node.js",
  "Vercel",
];

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-start">
        <ProfileImage size="large" isInteractive />
        <h1 className="w-full max-w-2xl pt-6 text-2xl font-bold sm:text-3xl">
          <Balancer>
            a full-stack developer with a passion for sweating details
          </Balancer>
        </h1>
        <div className="pt-6 md:pt-16">
          <p className="w-full max-w-2xl text-[15px] text-muted-foreground">
            I&#39;m a Punjabi living in Vancouver.
          </p>
          <p className="mt-2 w-full max-w-[72ch] text-[15px] text-muted-foreground">
            I mostly work with TypeScript and React, but also enjoy playing
            around with Go. I constantly tinker with my creations, striving to
            improve them wherever possible. I spend most of my day listening to
            music.
          </p>
          <p className="mt-2 w-full max-w-2xl text-[15px] text-muted-foreground">
            PS: I&#39;m in no way a designer. I just like to experiment with UI.
          </p>
        </div>
        <div className="mb-8 pt-6 md:pt-16">
          <AvailabilityBadge />
        </div>
      </section>
      <section className="w-full max-w-sm pt-2">
        <Card className={cn("rounded-[30px]")}>
          <CardHeader>
            <CardTitle>Tech I Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="h-9 rounded-md px-3">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
