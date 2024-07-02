import type { FileWithHandle } from "browser-fs-access";

export enum SceneBlobType {
  GLB = "glb",
  GLTF = "gltf",
};

export const sceneMimeTypes = {
  [SceneBlobType.GLB]: "model/gltf-binary",
  [SceneBlobType.GLTF]: "model/gltf+json",
} as const;

export const sceneFileExtensions = {
  [SceneBlobType.GLB]: ".glb",
  [SceneBlobType.GLTF]: ".gltf",
} as const;

const sceneMimeTypeExtensionMap = {
  ".glb": SceneBlobType.GLB,
  ".gltf": SceneBlobType.GLTF,
  "glb": SceneBlobType.GLB,
  "gltf": SceneBlobType.GLTF,
  "model/gltf+json": SceneBlobType.GLTF,
  "model/gltf-binary": SceneBlobType.GLB,
} as const;

export const getSceneBlobType = (file: Blob | FileWithHandle) => {
  if ("type" in file && file.type in sceneMimeTypeExtensionMap) {
    return sceneMimeTypeExtensionMap[
      file.type as keyof typeof sceneMimeTypeExtensionMap
    ];
  }
  if ("name" in file && file.name.split(".").length > 1) {
    const extension = file.name.split(".").toReversed()[0];
    if (extension in sceneMimeTypeExtensionMap) {
      return sceneMimeTypeExtensionMap[
        extension as keyof typeof sceneMimeTypeExtensionMap
      ];
    }
  }
  return;
};
