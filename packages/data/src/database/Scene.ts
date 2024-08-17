import { z } from "zod";

export const SceneDataSchema = z.object({
  createdAt: z.date(),
  description: z.string().optional(),
  id: z.number(),
  name: z.string(),
  thumbnail: z.string().optional(),
  updatedAt: z.date(),
});

export type SceneData = z.infer<typeof SceneDataSchema>;
