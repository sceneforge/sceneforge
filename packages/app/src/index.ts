import "@unocss/reset/sanitize/assets.css";
import "@unocss/reset/sanitize/sanitize.css";
import "virtual:uno.css";
import "virtual:unocss-devtools";

import { render, withRoot, withUserData } from "./root";
import "./styles/window-overlay.css";

try {
  await render();

  await withUserData(async (userData) => {
    if (userData) {
      const value = await userData.get("settings", "welcome");
      if (value === undefined) {
        await userData.set("settings", "welcome", true);
        return;
      }
    }
  });

  await withRoot((root) => {
    root.classList.add(
      "h-100vh",
      "w-100vw",
      "flex",
      "select-none",
      "text-center",
      "overflow-hidden",
      "font-sans",
      "bg-primary:50",
      "dark:text-light",
      "light:text-dark"
    );
  });
}
catch (error) {
  throw new Error("Failed to render app", { cause: error });
}
