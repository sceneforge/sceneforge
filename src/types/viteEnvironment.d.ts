/// <reference types="vite/client" />

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
  DEV: boolean;
  MODE: string;
  PROD: boolean;
  VITE_APP_AUTHOR?: string;
  VITE_APP_BASE_PATH?: string;
  VITE_APP_DESCRIPTION?: string;
  VITE_APP_KEYWORDS?: string;
  VITE_APP_NAME?: string;
  VITE_APP_REPOSITORY?: string;
  VITE_APP_VERSION?: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
