import { z } from "zod";

import { ThemeColorsSchema } from "./ThemeColors";
import { VariantSchema } from "./Variant";

export const ThemeSchema = z.object({
  bodyBackground: VariantSchema.optional(),
  colors: ThemeColorsSchema.optional(),
});

export type ThemeType = z.infer<typeof ThemeSchema>;
