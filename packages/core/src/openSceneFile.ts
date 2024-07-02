import { fileOpen } from "browser-fs-access";

import { getSceneBlobType, sceneFileExtensions, sceneMimeTypes } from "./sceneType";

export const openSceneFile = async (description: string) => {
  const result = await fileOpen({
    description,
    excludeAcceptAllOption: true,
    extensions: Object.values(sceneFileExtensions),
    mimeTypes: Object.values(sceneMimeTypes),
    multiple: false,
  });

  const type = getSceneBlobType(result);
  if (!type) {
    throw new Error("Invalid file type");
  }

  const buffer = await result.arrayBuffer();

  return new Blob([buffer], {
    type: sceneMimeTypes[type],
  });
};
