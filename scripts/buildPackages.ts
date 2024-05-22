import { yarnCommand } from "../lib/yarnCommand";

const run = async () => {
  await yarnCommand(["app", "site"], "build");
};

// eslint-disable-next-line unicorn/prefer-top-level-await
run().catch((error) => {
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
