"use client";
import { CheckIcon, ClipboardCopyIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const EMAIL = "bachiitter@pm.me";

export function EmailLink() {
  const [success, setSuccess] = useState(0);
  const incrementSuccess = () => {
    setSuccess((s) => s + 1);
  };

  useEffect(() => {
    if (!success) return;

    const timeout = setTimeout(() => {
      setSuccess(0);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="p-0 h-auto">
          email
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 text-sm flex items-center gap-2 w-auto overflow-clip rounded-sm">
        <Button
          size="sm"
          variant="outline"
          className="-my-[1px] -ml-[1px] h-7 px-2 rounded-none bg-transparent"
          onClick={() => {
            if (!navigator.clipboard) {
              console.log(
                "no clipboard! This api requires https on chrome so if you're on localhost I'm sorry",
              );
              return;
            }
            navigator.clipboard.writeText(EMAIL).then(incrementSuccess);
          }}
        >
          {success ? <CheckIcon className="w-3.5" /> : <ClipboardCopyIcon className="w-3.5" />}{" "}
        </Button>
        <Button variant="link" className="p-0 h-auto text-foreground">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="-my-[1px] -mr-[1px] h-7 px-2 rounded-none bg-transparent"
        >
          <a href={`mailto:${EMAIL}`}>
            <PaperPlaneIcon className="w-3.5" />
          </a>
        </Button>
      </PopoverContent>
    </Popover>
  );
}
