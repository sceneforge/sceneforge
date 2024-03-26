export type Model = {
  title: string;
  id: string;
  gltf?: Blob;
  capture?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const isModel = (obj: unknown): obj is Model => {
  if (typeof obj !== "object") return false;
  if (Array.isArray(obj)) return false;
  if (obj === null) return false;

  if (!("title" in obj)) return false;
  if (typeof obj.title !== "string") return false;

  if (!("id" in obj)) return false;
  if (typeof obj.id !== "string") return false;

  if ("gltf" in obj && obj.gltf !== undefined) {
    if (!(obj.gltf instanceof Blob)) return false;
  }

  if ("capture" in obj && obj.capture !== undefined) {
    if (typeof obj.capture !== "string") return false;
  }

  if ("createdAt" in obj && obj.createdAt !== undefined) {
    if (!(obj.createdAt instanceof Date)) return false;
  }

  if ("updatedAt" in obj && obj.updatedAt !== undefined) {
    if (!(obj.updatedAt instanceof Date)) return false;
  }

  return true;
};
