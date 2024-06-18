export const applyBasePath = (basePath: string, url?: string): string => {
  if (!url) return basePath;

  if (url.startsWith("/") && !url.startsWith(basePath)) {
    return basePath.endsWith("/") ? basePath + url.slice(1) : basePath + url;
  }

  return url;
};
