import { createRoot } from "react-dom/client";

import { App, AppProvider } from "./components/App";
import { i18nInit } from "./lib/i18n";

const rootElement = document.body as HTMLBodyElement;
const root = createRoot(rootElement);

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
  callback: (root: HTMLBodyElement) => Promise<void> | void
) => callback(rootElement);
