import { cleanupCss } from "./cleaupCss";

const buildFinish = async () => {
  await cleanupCss();
};

void buildFinish();
