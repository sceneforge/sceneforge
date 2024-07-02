import { useContext } from "react";

import { AppContext } from "./AppProvider";

export const useAppContext = () => {
  const {
    author,
    basePath,
    description,
    development,
    keywords,
    name,
    repository,
    tabsHandlerRef,
    version,
  } = useContext(AppContext);

  return {
    author,
    basePath,
    description,
    development,
    keywords,
    name,
    repository,
    tabsHandlerRef,
    version,
  };
};
