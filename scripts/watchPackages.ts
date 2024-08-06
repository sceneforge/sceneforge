import { watch } from "chokidar";
import { execSync } from "node:child_process";

let rebuildTimeout: NodeJS.Timeout | null = null;
let rebuildPackages: string[] = [];

const rebuild = (packageName: string) => {
  console.log(`Rebuilding ${packageName}`);
  // Run the build command for the package
  execSync(`yarn workspace ${packageName} build`, {
    stdio: "inherit",
  });
};

const includePackage = (packageName: string) => {
  if (rebuildTimeout === null) {
    rebuildTimeout = setTimeout(() => {
      for (const name of rebuildPackages) {
        rebuild(name);
      }
      rebuildPackages = [];
      rebuildTimeout = null;
    }, 1000);
  }

  if (!rebuildPackages.includes(packageName)) {
    rebuildPackages = [...rebuildPackages, packageName];
  }
};

const packagePath = (path: string, directory: string, packageName: string) => {
  if (path.startsWith(directory) && !path.includes("node_modules") && !path.includes("dist")) {
    includePackage(packageName);
  }
};

watch(".").on("all", (_, path) => {
  packagePath(path, "packages/core", "@sceneforge/core");
  packagePath(path, "packages/data", "@sceneforge/data");
  packagePath(path, "packages/platform", "@sceneforge/platform");
  packagePath(path, "packages/scene", "@sceneforge/scene");
  packagePath(path, "packages/ui", "@sceneforge/ui");
});
