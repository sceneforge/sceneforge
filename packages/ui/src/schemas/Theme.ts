import { z } from "zod";

import { ThemeColorsSchema } from "./ThemeColors";

export const ThemeSchema = z.object({
  colors: ThemeColorsSchema.optional(),
});

export type ThemeType = z.infer<typeof ThemeSchema>;
