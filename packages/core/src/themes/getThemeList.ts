import { ThemeListSchema } from "@sceneforge/ui";

export const getThemeList = async () => {
  const result = await fetch("/themes/themes.json");
  return ThemeListSchema.parse(await result.json());
};
