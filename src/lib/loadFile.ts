export const loadFile = async (file: File) => {
  const buffer = await file.arrayBuffer();

  return {
    blob: () => new Blob([buffer], { type: "application/octet-stream" }),
    url: () =>
      URL.createObjectURL(
        new Blob([buffer], { type: "application/octet-stream" }),
      ),
  };
};
