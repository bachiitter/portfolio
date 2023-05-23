import Image from "next/image";

import profilePic from "@/assets/dp.png";
import { cn } from "@/utils/cn";

export const ProfileImage = ({
  size = "large",
  isInteractive,
}: {
  size: "small" | "large";
  isInteractive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-tl from-blue-700/40 to-indigo-400/40 shadow-lg",
        {
          "p-[2px]": size === "small",
          "p-[3px]": size === "large",
          "group transform transition ease-out hover:scale-105 hover:from-blue-700/80 hover:to-indigo-400/80 hover:shadow-indigo-500/40 active:translate-y-px":
            isInteractive,
          "ring-[5px] ring-purple-500/10": !isInteractive,
        }
      )}>
      <div
        className={cn("rounded-full p-px", {
          "h-[36px] w-[36px]": size === "small",
          "h-[64px] w-[64px]": size === "large",
          "transition duration-300 group-hover:scale-105": isInteractive,
        })}>
        <Image
          src={profilePic}
          alt="Picture of Bachitter"
          quality={95}
          priority={true}
          className="rounded-full"
          width={size === "small" ? 36 : 64}
          height={size === "small" ? 36 : 64}
        />
      </div>
    </div>
  );
};
