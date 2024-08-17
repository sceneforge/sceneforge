import { z } from "zod";

export const HotspotDataSchema = z.object({
  createdAt: z.date(),
  description: z.string().optional(),
  distance: z.number().optional(),
  id: z.number(),
  label: z.string(),
  sceneId: z.number(),
  updatedAt: z.date(),
  url: z.string().optional(),
});

export type HotspotData = z.infer<typeof HotspotDataSchema>;
