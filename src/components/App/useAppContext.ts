import { useContext } from "react";
import { AppContext } from "./AppProvider";

export const useAppContext = () => {
  const {
    name,
    description,
    version,
    development,
    resolvedLanguage,
    direction,
    languages,
    setResolvedLanguage,
    basePath,
    keywords,
    author,
    repository,
  } = useContext(AppContext);

  return {
    name,
    description,
    version,
    development,
    resolvedLanguage,
    setResolvedLanguage,
    direction,
    languages,
    basePath,
    keywords,
    author,
    repository,
  };
};
