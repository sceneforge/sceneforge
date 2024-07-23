import { use } from "react";

import { AppContext } from "../providers/AppContext";

export const useAppContext = () => {
  const {
    author,
    basePath,
    description,
    development,
    keywords,
    name,
    overlayVisible,
    repository,
    setOverlayVisible,
    tabsHandlerRef,
    version,
  } = use(AppContext);

  return {
    author,
    basePath,
    description,
    development,
    keywords,
    name,
    overlayVisible,
    repository,
    setOverlayVisible,
    tabsHandlerRef,
    version,
  };
};
