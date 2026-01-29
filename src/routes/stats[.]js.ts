import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stats.js")({
  server: {
    handlers: {
      GET: async () => {
        const scriptText = await fetch("https://cloud.umami.is/script.js");
        const text = await scriptText.text();

        return new Response(text, {
          headers: {},
        });
      },
    },
  },
});
