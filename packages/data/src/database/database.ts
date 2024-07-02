import Dexie, { EntityTable } from "dexie";

import type { ModelData } from "./Model";
import type { SceneData } from "./Scene";
import type { SettingsData } from "./Settings";

export type Database = {
  model: EntityTable<ModelData, "id">;
  scene: EntityTable<SceneData, "id">;
  settings: EntityTable<SettingsData, "key">;
} & Dexie;

const database = new Dexie("SceneForge") as Database;

database.version(1).stores({
  model: "++id, sceneId, name, createdAt, updatedAt",
  scene: "++id, name, createdAt, updatedAt",
  settings: "&key",
});

export default database;
