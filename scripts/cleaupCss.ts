import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const cleanupCss = async () => {
  const distributionAssets = "apps/sceneforge/dist/assets";
  const files = await readdir(distributionAssets);
  const cssFiles = files.filter(name => name.endsWith(".css")).map(name => path.join(distributionAssets, name));

  for (const cssFile of cssFiles) {
    const css = await readFile(cssFile, { encoding: "utf8" });
    const newCSS = css.replaceAll(String.raw`:not(#\#)`, "");
    await writeFile(cssFile, newCSS, { encoding: "utf8" });
    console.log("Cleaned up CSS file:", cssFile);
  }
};
