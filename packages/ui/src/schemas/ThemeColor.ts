import { z } from "zod";

export const ThemeColorSchema = z.object({
  dark: z.string().optional(),
  light: z.string().optional(),
});

export type ThemeColorType = z.infer<typeof ThemeColorSchema>;
