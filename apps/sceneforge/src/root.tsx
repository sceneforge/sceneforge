import { createRoot } from "react-dom/client";

import { App, AppProvider } from "./components/App";
import { i18nInit } from "./lib/i18n";

const rootElement = document.createElement("div");
const root = createRoot(rootElement);
document.body.append(rootElement);

export const render = async () => {
  const { languages } = await i18nInit();
  root.render(
    <AppProvider languages={languages}>
      <App />
    </AppProvider>
  );
  return root;
};

export const withRoot = (
  callback: (root: HTMLDivElement) => Promise<void> | void
) => callback(rootElement);
