import "@sceneforge/ui/styles/main.css";

import { render, withRoot } from "./root";

try {
  await withRoot((root) => {
    root.style.width = "100dvw";
    root.style.height = "100dvh";
    root.style.maxWidth = "100dvw";
    root.style.maxHeight = "100dvh";
    root.style.minWidth = "100dvw";
    root.style.minHeight = "100dvh";
    root.style.overflow = "hidden";
  });

  await render();
}
catch (error) {
  throw new Error("Failed to render app", { cause: error });
}
