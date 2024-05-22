import { createRoot } from "react-dom/client";

import { Site } from "./components/Site";

const rootElement = document.createElement("div");
const root = createRoot(rootElement);
document.body.append(rootElement);

export const render = () => {
  root.render(<Site />);
  return root;
};
