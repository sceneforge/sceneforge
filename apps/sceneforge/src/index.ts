import "@sceneforge/ui/styles/main.css";

import { render } from "./root";

try {
  await render();
}
catch (error) {
  throw new Error("Failed to render app", { cause: error });
}
