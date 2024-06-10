import { CodeBlock, MDXComponents } from "mdxts/components";
import { PackageInstall } from "mdxts/components/PackageInstall";
import * as React from "react";

export function useMDXComponents() {
  return {
    PackageInstall,
    CodeBlock: (props) => <CodeBlock {...props} />,
    Error: (props) => <div {...props} />,
    Outline: (props) => <div {...props} />,
    References: (props) => <div {...props} />,
    code: (props) => <MDXComponents.code {...props} />,
    pre: (props) => <MDXComponents.pre {...props} />,
  } satisfies MDXComponents;
}
