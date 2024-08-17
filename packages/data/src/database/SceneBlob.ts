import { z } from "zod";

export const SceneBlobDataSchema = z.object({
  blob: z.instanceof(Blob).optional(),
  createdAt: z.date(),
  id: z.number(),
  name: z.string(),
  sceneId: z.number(),
  updatedAt: z.date(),
});

export type SceneBlobData = z.infer<typeof SceneBlobDataSchema>;
