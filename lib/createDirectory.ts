import { mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const getErrorCode = (error: unknown): number | string | undefined => {
  if (error instanceof Error) {
    if (
      "code" in error
      && (
        typeof error.code === "string"
        || typeof error.code === "number"
      )
    ) {
      return error.code;
    }
    if (
      "cause" in error
      && typeof error.cause === "object"
      && error.cause !== null
      && "code" in error.cause
      && (
        typeof error.cause.code === "string"
        || typeof error.cause.code === "number"
      )
    ) {
      return error.cause.code;
    }
  }
  return;
};

export const createDirectory = async (directoryPath: string, {
  recursive,
}: {
  recursive?: boolean;
} = {}) => {
  if (!process.env.npm_package_json) {
    throw new Error("Unable to find the project package.json file");
  }

  const rootDirectory = path.dirname(process.env.npm_package_json);
  const inputPath = path.join(rootDirectory, directoryPath);

  try {
    const stats = await stat(inputPath);
    if (stats.isDirectory()) {
      await rm(inputPath, { recursive: true });
    }
    else {
      const error = new Error(`ENOTDIR: not a directory, stat '${inputPath}'`, {
        cause: {
          code: "ENOTDIR",
        },
      });
      throw error;
    }
    return mkdir(inputPath, { recursive });
  }
  catch (error) {
    const code = getErrorCode(error);
    switch (code) {
      case "ENOENT":
        return mkdir(inputPath, { recursive });
      case "ENOTDIR":
        throw new Error("Path exists and is not a directory");
      default:
        throw error;
    }
  }
};
