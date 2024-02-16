import { createRoot } from "react-dom/client";
import { App } from "./App";

import styles from './styles/Root.module.css';

import "./styles/base.css";
import "./styles/colors.css";
import "./styles/reset.css";
import "./styles/round.css";

const root = document.createElement("div");
root.className = styles.wrapper;
createRoot(root).render(<App />);
document.body.appendChild(root);
