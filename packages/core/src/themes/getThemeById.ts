import { type ThemeListType } from "@sceneforge/ui";

import { getTheme } from "./getTheme";
import { getThemeList } from "./getThemeList";

export const getThemeById = async (themeId: string, themes?: ThemeListType) => {
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
