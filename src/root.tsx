import { createRoot } from "react-dom/client";

import { App } from "./components/App";
import { Database } from "./lib/Database";
import { UserDataStores } from "./lib/UserDataStores";
import { i18nInit } from "./lib/i18n";

const rootElement = document.createElement("div");
const root = createRoot(rootElement);
document.body.append(rootElement);

const userData = new Database("UserData", UserDataStores);

export const render = async () => {
  const { languages } = await i18nInit();
  root.render(<App languages={languages} userData={userData} />);
  return root;
};

export const withUserData = (
  callback: (userData: Database<"UserData">) => Promise<void> | void
) => callback(userData);

export const withRoot = (
  callback: (root: HTMLDivElement) => Promise<void> | void
) => callback(rootElement);
