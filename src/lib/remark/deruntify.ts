import { visit } from "unist-util-visit";

export function remarkDeruntify() {
  // biome-ignore lint/suspicious/noExplicitAny: no type export
  function transformer(tree: any) {
    visit(tree, "text", function (node) {
      const wordCount = node.value.split(" ").length;

      if (wordCount >= 4) {
        node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
      }
    });
  }

  return transformer;
}
