import { fileOpen } from "browser-fs-access";

import { getSceneBlobType, sceneFileExtensions, sceneMimeTypes } from "./sceneType";

/**
 * Triggers the OS filesystem open dialog to select a 3D scene file,
 * validates the choosen file based on the supported file types and
 * returns the Blob object ready to be processed.
 *
 * @param description Suggested file description to be displayed in the dialog
 * @returns A promise with the 3D scene Blob object
 * @throws If the selected file is not a valid 3D scene file
 */
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
