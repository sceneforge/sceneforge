import type { FileWithHandle } from "browser-fs-access";

/**
 * 3D Scene Blob Types
 */
export enum SceneBlobType {
  GLB = "glb",
  GLTF = "gltf",
};

/**
 * Mimetype mapping for each 3D scene Blob Type
 *
 * @readonly
 * @see {@link SceneBlobType}
 */
export const sceneMimeTypes = {
  [SceneBlobType.GLB]: "model/gltf-binary",
  [SceneBlobType.GLTF]: "model/gltf+json",
} as const;

/**
 * File extension mapping for each 3D scene Blob Type
 *
 * @readonly
 * @see {@link SceneBlobType}
 */
export const sceneFileExtensions = {
  [SceneBlobType.GLB]: ".glb",
  [SceneBlobType.GLTF]: ".gltf",
} as const;

/**
 * Reverse mapping for 3D scene Blob Type from File extension,
 * mimetype or Blob type.
 *
 * @readonly
 * @see {@link SceneBlobType}
 */
const sceneMimeTypeExtensionMap = {
  ".glb": SceneBlobType.GLB,
  ".gltf": SceneBlobType.GLTF,
  "glb": SceneBlobType.GLB,
  "gltf": SceneBlobType.GLTF,
  "model/gltf+json": SceneBlobType.GLTF,
  "model/gltf-binary": SceneBlobType.GLB,
} as const;

/**
 * Returns the 3D scene Blob Type based on the given file
 *
 * @param file 3D scene file blob or 3D scene file with handle.
 * @returns The SceneBlobType of the given file or undefined
 * if the given file does not match an expected type.
 *
 * @see {@link SceneBlobType}
 */
export const getSceneBlobType = (
  file: Blob | FileWithHandle
): SceneBlobType | undefined => {
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
