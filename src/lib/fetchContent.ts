export const fetchContent = async <T = unknown>(
  locale: string,
  path: string,
): Promise<T> => {
  const url = `/locales/content/${locale}${path}`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as T;
  } else {
    throw new Error(`Failed to fetch content from ${path}`);
  }
};
