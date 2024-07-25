import { buildAppSitemap } from "./buildAppSitemap";
import { cleanupCss } from "./cleaupCss";

const buildFinish = async () => {
  await cleanupCss();
  await buildAppSitemap();
};

void buildFinish();
