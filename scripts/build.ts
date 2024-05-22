import { copyDirectory } from "../lib/copyDirectory";
import { createDirectory } from "../lib/createDirectory";
import { yarnCommand } from "../lib/yarnCommand";

export const run = async () => {
  await yarnCommand("root", "build:packages");
  await createDirectory("dist/app", { recursive: true });

  await copyDirectory("packages/site/dist/", "dist/");
  await copyDirectory("packages/app/dist/", "dist/app/");
};

// eslint-disable-next-line unicorn/prefer-top-level-await
run().catch((error) => {
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
