import { readdir } from "node:fs/promises";
import path from "node:path";

export const cleanupCss = async () => {
  const distributionAssets = "apps/sceneforge/dist/assets";
  const files = await readdir(distributionAssets);
  const cssFiles = files.filter(name => name.endsWith(".css")).map(name => path.join(distributionAssets, name));

  for (const cssFile of cssFiles) {
    const css = await Bun.file(cssFile).text();
    await Bun.write(cssFile, css.replaceAll(String.raw`:not(#\#)`, ""));
    console.log("Cleaned up CSS file:", cssFile);
  }
};
