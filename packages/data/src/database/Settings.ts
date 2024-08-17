import { z } from "zod";

export const SettingsValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.union([z.string(), z.number(), z.boolean()])),
]).optional();

export type SettingsValue = z.infer<typeof SettingsValueSchema>;

export const SettingsDataSchema = z.object({
  key: z.string(),
  value: SettingsValueSchema,
});

export type SettingsData = z.infer<typeof SettingsDataSchema>;
