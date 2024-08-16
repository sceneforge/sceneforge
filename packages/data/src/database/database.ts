import Dexie, { EntityTable } from "dexie";

import type { HotspotData } from "./Hotspot";
import type { ModelData } from "./Model";
import type { SceneData } from "./Scene";
import type { SceneBlobData } from "./SceneBlob";
import type { SettingsData } from "./Settings";

export type Database = {
  hotspot: EntityTable<HotspotData, "id">;
  model: EntityTable<ModelData, "id">;
  scene: EntityTable<SceneData, "id">;
  sceneBlob: EntityTable<SceneBlobData, "id">;
  settings: EntityTable<SettingsData, "key">;
} & Dexie;

const database = new Dexie("SceneForge") as Database;

database.version(1).stores({
  hotspot: "++id, sceneId, label, createdAt, updatedAt",
  model: "++id, sceneId, name, createdAt, updatedAt",
  scene: "++id, name, createdAt, updatedAt",
  sceneBlob: "++id, sceneId, name, createdAt, updatedAt",
  settings: "&key",
});

export default database;
