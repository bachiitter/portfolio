/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly API_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
