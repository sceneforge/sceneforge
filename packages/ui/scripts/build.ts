import createStylexPlugin from "bun-plugin-stylex";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { exit } from "node:process";

const size = (value: number) => {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(2)} KB`;
  if (value < 1024 * 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  if (value < 1024 * 1024 * 1024 * 1024) return `${(value / 1024 / 1024 / 1024).toFixed(2)} GB`;
  return `${value} B`;
};

const [stylexPlugin, generateCSS] = createStylexPlugin({
  dev: false,
  useCSSLayers: true,
});

const result = await Bun.build({
  entrypoints: ["./src/index.ts"],
  external: ["react", "react-dom"],
  minify: false,
  outdir: "./dist",
  plugins: [stylexPlugin],
  sourcemap: "inline",
  splitting: true,
});

const generatedCSS = await generateCSS();

const rootDirectory = path.resolve(import.meta.dirname, "..");

if (generatedCSS) {
  await Bun.write(path.join(rootDirectory, "dist", "styles", "components.css"), generatedCSS);
}

const cssFiles = await readdir(path.join(rootDirectory, "src", "styles"));

for (const cssFile of cssFiles) {
  if (cssFile.endsWith(".css")) {
    await Bun.write(
      path.join(rootDirectory, "dist", "styles", cssFile),
      Bun.file(path.join(rootDirectory, "src", "styles", cssFile))
    );
  }
}

if (result.success) {
  for (const log of result.logs) {
    console.log(log);
  }
  const outputTable = [];

  for (const output of result.outputs) {
    if (output.path && output.kind === "chunk") {
      outputTable.push({
        Bytes: output.size,
        File: path.relative(rootDirectory, output.path),
        Loader: output.loader,
        Size: size(output.size),
      });
    }
  }

  console.table(outputTable.toSorted(
    ({ Bytes: aBytes }, { Bytes: bBytes }) => aBytes - bBytes
  ), ["File", "Loader", "Size"]);

  console.log("Build succeeded");
  exit(0);
}
else {
  for (const log of result.logs) {
    console.error(log);
  }
  console.error("Build failed");
  exit(1);
}
