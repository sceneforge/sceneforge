import { z } from "zod";

export const ThemeListItemSchema = z.object({
  description: z.string().optional(),
  id: z.string().regex(/^[\da-z-]+$/),
  name: z.string(),
  url: z.string(),
});

export type ThemeListItemType = z.infer<typeof ThemeListItemSchema>;
