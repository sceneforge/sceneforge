import { ThemeListSchema, type ThemeListType } from "@sceneforge/ui";

/**
 * Get the available theme list from the /themes/themes.json file.
 *
 * @returns A promise with the list of themes available.
 * @throws If the request to /themes/themes.json fails or the
 * response does not match the expected schema.
 */
export const getThemeList = async (): Promise<ThemeListType> => {
  const result = await fetch("/themes/themes.json");
  return ThemeListSchema.parse(await result.json());
};
