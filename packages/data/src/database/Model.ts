export interface ModelData {
  createdAt: Date;
  description?: string;
  gltf?: Blob;
  id: number;
  name: string;
  sceneId: number;
  thumbnail?: string;
  updatedAt: Date;
};
