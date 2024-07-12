import { ThemeSchema } from "@sceneforge/ui";

export const getTheme = async (themePath: string) => {
  const result = await fetch(themePath);
  return ThemeSchema.parse(await result.json());
};
