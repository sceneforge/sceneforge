/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_NAME?: string;
  VITE_APP_DESCRIPTION?: string;
  VITE_APP_VERSION?: string;
  DEV: boolean;
  PROD: boolean;
  MODE: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
