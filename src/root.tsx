import { App } from "./components/App";
import { createRoot } from "react-dom/client";
import { Database } from "./lib/Database";
import { UserDataStores } from "./lib/UserDataStores";

const rootElement = document.createElement("div");
const root = createRoot(rootElement);
document.body.appendChild(rootElement);

const userData = new Database("UserData", UserDataStores);

export const render = () => {
  root.render(<App userData={userData} />);
};

export const withUserData = (
  callback: (userData: Database<"UserData">) => void | Promise<void>
) => callback(userData);

export const withRoot = (
  callback: (root: HTMLDivElement) => void | Promise<void>
) => callback(rootElement);
