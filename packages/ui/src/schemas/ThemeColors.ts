import { z } from "zod";

import { ThemeColorPlacementSchema } from "./ThemeColorPlacement";
import { VariantSchema } from "./Variant";

export const ThemeColorsSchema = z.record(
  VariantSchema,
  ThemeColorPlacementSchema
);

export type ThemeColorsType = z.infer<typeof ThemeColorsSchema>;
