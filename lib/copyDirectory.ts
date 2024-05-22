import { constants, copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

export const copyDirectory = async (
  sourceDirectory: string,
  targetDirectory: string
) => {
  if (!process.env.npm_package_json) {
    throw new Error("Unable to find the project package.json file");
  }

  const rootDirectory = path.dirname(process.env.npm_package_json);
  const sourceDirectoryInput = path.join(rootDirectory, sourceDirectory);
  const targetDirectoryInput = path.join(rootDirectory, targetDirectory);

  const result = await readdir(sourceDirectoryInput, {
    recursive: true,
    withFileTypes: false,
  });

  for (const file of result) {
    const source = path.join(sourceDirectoryInput, file);
    const target = path.join(targetDirectoryInput, file);

    const stats = await stat(source);

    if (stats.isFile()) {
      await mkdir(path.dirname(target), { recursive: true });
      await copyFile(source, target, constants.COPYFILE_FICLONE);
    }
  }
};
