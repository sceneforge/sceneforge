import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { Database } from "./lib/Database";
import { UserDataStores } from "./lib/UserDataStores";
import { observeThemeColor, updateReferenceColor } from "./lib/themeColor";
import styles from "./styles/Root.module.css";
import "./styles/base.css";
import "./styles/colors.css";
import "./styles/reset.css";
import "./styles/round.css";

library.add(fas, far, fab);
const userData = new Database("UserData", UserDataStores);

userData.get("colorScheme", "color-reference").then((color) => {
  if (color && typeof color === "string" && color.startsWith("#")) {
    document.querySelector("meta[name=theme-color]")?.setAttribute("content", color);
  } else {
    document.querySelector("meta[name=theme-color]")?.setAttribute("content", "#22AAFF");
  }
}).catch(console.error);

observeThemeColor(updateReferenceColor);

const root = document.createElement("div");

root.className = styles.wrapper;

createRoot(root).render(<App userData={userData} />);

document.body.appendChild(root);
