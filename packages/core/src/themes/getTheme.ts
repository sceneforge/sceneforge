import { ThemeSchema, type ThemeType } from "@sceneforge/ui";

/**
 * Get the Theme object from the given path.
 *
 * @param themePath The path of the JSON file to load.
 * @returns A promise with the required theme object parsed.
 * @throws If the given path is not valid or does not match the expected schema.
 */
export const getTheme = async (themePath: string): Promise<ThemeType> => {
  const result = await fetch(themePath);
  return ThemeSchema.parse(await result.json());
};
