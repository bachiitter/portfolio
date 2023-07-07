/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Language, PrismTheme } from "prism-react-renderer";
import { Highlight } from "prism-react-renderer";
import { cn } from "~/utils/cn";

type Props = {
  code: string;
  language: Language;
  metastring?: string;
};

const theme: PrismTheme = {
  plain: {
    color: "#aaaaaa",
    backgroundColor: "#101010",
  },
  styles: [
    {
      types: ["variable", "operator"],
      style: {
        color: "#AAAAAA",
      },
    },
    {
      types: ["keyword", "number", "constant", "hexcode", "attr-name"],
      style: {
        color: "#8D8D8D",
      },
    },
    {
      types: ["builtin", "regex", "char"],
      style: {
        color: "#7E7E7E",
      },
    },
    {
      types: ["tag", "deleted"],
      style: {
        color: "#707070",
      },
    },
    {
      types: ["selector", "changed"],
      style: {
        color: "#6C6C6C",
      },
    },
    {
      types: ["inserted"],
      style: {
        color: "#878787",
      },
    },
  ],
};

export const CodeBlock = ({ code, language }: Props) => {
  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={cn(className)}>
          {tokens.map((line: any[], i: number) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
