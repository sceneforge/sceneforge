import { z } from "zod";

export const ModelDataSchema = z.object({
  createdAt: z.date(),
  description: z.string().optional(),
  id: z.number(),
  name: z.string(),
  sceneId: z.number(),
  updatedAt: z.date(),
});

export type ModelData = z.infer<typeof ModelDataSchema>;
