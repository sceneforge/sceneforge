export const supportDocumentPictureInPicture = (): boolean => {
  if (window instanceof Window) {
    return "documentPictureInPicture" in window && window.documentPictureInPicture !== undefined;
  }
  return false;
};
