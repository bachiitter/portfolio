import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";
import { postType } from "./src/sanity/schema";

export default defineConfig({
  projectId: "4cylhej4",
  dataset: "production",
  plugins: [structureTool(), markdownSchema()],
  schema: {
    types: [postType],
  },
});
