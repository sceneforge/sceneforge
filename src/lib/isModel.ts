export type Model = {
  title: string;
  id: string;
  gltf?: Blob;
  capture?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const isModel = (object: unknown): object is Model => {
  if (typeof object !== "object") return false;
  if (Array.isArray(object)) return false;
  if (object === null) return false;

  if (!("title" in object)) return false;
  if (typeof object.title !== "string") return false;

  if (!("id" in object)) return false;
  if (typeof object.id !== "string") return false;

  if (
    "gltf" in object
    && object.gltf !== undefined
    && !(object.gltf instanceof Blob)
  )
    return false;

  if (
    "capture" in object
    && object.capture !== undefined
    && typeof object.capture !== "string"
  )
    return false;

  if (
    "createdAt" in object
    && object.createdAt !== undefined
    && !(object.createdAt instanceof Date)
  )
    return false;

  if (
    "updatedAt" in object
    && object.updatedAt !== undefined
    && !(object.updatedAt instanceof Date)
  )
    return false;

  return true;
};
