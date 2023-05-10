/* eslint-disable @next/next/no-img-element */

import { NowPlaying } from "@/components/NowPlaying";

import pfp from "../assets/pfp.jpg";

export default function Home() {
  return (
    <main className="xs:bg-neutral-100 fixed inset-0 flex h-full w-full items-center justify-center">
      <div className="h-[calc(100% - 48px)] w-[calc(100% - 48px)] xs:p-14 flex max-h-[600px] max-w-[400px] flex-col gap-4 rounded-[48px] bg-white p-10">
        <div className="relative w-fit">
          <img
            //@ts-expect-error image is not typed
            src={pfp}
            alt="Image of Bachitter"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-neutral-800">
            Hello! I&#39;m Bachitter.
          </h1>
          <p className="font-medium text-neutral-600">
            Software engineer, building dumb stuff on the internet.
          </p>
        </div>
        <ul className="flex flex-col gap-4 text-neutral-600">
          <li className="flex items-center gap-2">
            <div className="text-xl">📍</div>
            <p>
              Lives in <span className="font-semibold">Vancouver, Canada</span>
            </p>
          </li>
          <li className="flex items-center gap-2">
            <div className="text-xl">🏗️</div>
            <p>
              Building{" "}
              <span className="font-semibold">
                <a href="https://dayplanr.bachitter.dev">Dayplanr</a>
              </span>
            </p>
          </li>
          <li className="flex items-center gap-2">
            <NowPlaying />
          </li>
        </ul>
        <div className="w-[calc(100% - 64px)] xs:flex-row mt-16 flex h-[48px] flex-col gap-4">
          <a
            className="block flex-1 rounded-[24px] bg-neutral-100 text-center font-semibold leading-[48px]"
            href="https://twitter.com/bachiitter">
            Twitter
          </a>
          <a
            className="block flex-1 rounded-[24px] bg-neutral-100 text-center font-semibold leading-[48px]"
            href="mailto:me@bachitter.dev">
            Email
          </a>
        </div>
      </div>
    </main>
  );
}
