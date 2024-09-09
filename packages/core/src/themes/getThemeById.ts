import { type ThemeListType, type ThemeType } from "@sceneforge/ui";

import { getTheme } from "./getTheme";
import { getThemeList } from "./getThemeList";

/**
 * Get the theme object based on the given id and the list of themes
 *
 * @param themeId The theme id
 * @param [themes] The theme list object, it will request the list if omitted
 * @returns A promise with the required theme object
 * @throws If the given theme id is not found or the theme has no URL
 */
export const getThemeById = async (
  themeId: string,
  themes?: ThemeListType
): Promise<ThemeType> => {
  let currentThemes = themes;
  if (!currentThemes) {
    currentThemes = await getThemeList();
  }

  const themeRef = currentThemes.themes.find(theme => theme.id === themeId);

  if (!themeRef) {
    throw new Error(`Theme with id "${themeId}" not found`);
  }

  if (!themeRef.url) {
    throw new Error(`Theme with id "${themeId}" has no URL`);
  }

  return await getTheme(themeRef.url);
};
