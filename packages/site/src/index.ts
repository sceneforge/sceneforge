import { render } from "./root";

try {
  render();
}
catch (error) {
  throw new Error("Failed to render app", { cause: error });
}
