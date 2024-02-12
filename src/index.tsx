import { createRoot } from "react-dom/client";
import { App } from "./App";

import "./styles/base.css";
import "./styles/colors.css";
import "./styles/reset.css";
import "./styles/round.css";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(<App />);
}
