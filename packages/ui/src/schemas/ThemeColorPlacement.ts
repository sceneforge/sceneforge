import { z } from "zod";

import { ThemeColorSchema } from "./ThemeColor";

export const ThemeColorPlacementSchema = z.object({
  background: ThemeColorSchema.optional(),
  foreground: ThemeColorSchema.optional(),
});

export type ThemeColorPlacementType = z.infer<typeof ThemeColorPlacementSchema>;
