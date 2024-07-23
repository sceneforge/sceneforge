import { getThemeById } from "@sceneforge/core";
import "@sceneforge/ui/styles/main.css";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./components";
import { i18nInit } from "./lib/i18n";
import { AppProvider } from "./providers";

const rootElement = document.body as HTMLBodyElement;
const root = createRoot(rootElement);

try {
  const { languages } = await i18nInit();
  const defaultTheme = await getThemeById("default");

  root.render(
    createElement(AppProvider, {
      languages,
      theme: defaultTheme,
    }, createElement(App))
  );
}
catch (error) {
  throw new Error("Failed to render app", { cause: error });
}
