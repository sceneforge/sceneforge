import { useContext } from "react";

import { AppContext } from "./AppProvider";

export const useAppContext = () => {
  const {
    author,
    basePath,
    description,
    development,
    direction,
    keywords,
    languages,
    name,
    repository,
    resolvedLanguage,
    setResolvedLanguage,
    version,
  } = useContext(AppContext);

  return {
    author,
    basePath,
    description,
    development,
    direction,
    keywords,
    languages,
    name,
    repository,
    resolvedLanguage,
    setResolvedLanguage,
    version,
  };
};
