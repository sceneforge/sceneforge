import { applyBasePath } from "./applyBasePath";

export const fetchContent = async <T = unknown>(
  locale: string,
  path: string
): Promise<T> => {
  const basePath = import.meta.env.VITE_APP_BASE_PATH ?? "/";

  const url = applyBasePath(basePath, `/locales/content/${locale}${path}`);

  const response = await fetch(url);

  if (response.ok) {
    return (await response.json()) as T;
  }
  else {
    throw new Error(`Failed to fetch content from ${path}`);
  }
};
