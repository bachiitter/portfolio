"use client";

import { useState } from "react";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { badgeVariants } from "@/components/ui/Badge";

const items = [
  {
    id: 1,
    content: "Available for work",
  },
  {
    id: 2,
    content: "me@bachitter.dev",
  },
];

export function AvailabilityBadge() {
  const [index, setIndex] = useState(0);

  return (
    <motion.a
      onHoverStart={() => setIndex(1)}
      onHoverEnd={() => setIndex(0)}
      key={items[index].id}
      href="mailto:me@bachitter.dev"
      className={cn(
        badgeVariants({ variant: "secondary" }),
        "w-full gap-x-2 px-3.5 py-1.5"
      )}>
      <div className="relative flex items-center gap-x-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
        </span>
        <AnimatePresence>
          <motion.span
            key={items[index].id}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className="flex items-center gap-x-2 overflow-hidden">
            {items[index].content}
            {items[index].id === 2 ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : null}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.a>
  );
}
