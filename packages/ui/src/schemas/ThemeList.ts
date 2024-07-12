import { z } from "zod";

import { ThemeListItemSchema } from "./ThemeListItem";

export const ThemeListSchema = z.object({
  themes: z.array(ThemeListItemSchema),
});

export type ThemeListType = z.infer<typeof ThemeListSchema>;
