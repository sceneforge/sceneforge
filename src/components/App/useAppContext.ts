import { useContext } from "react";
import { AppContext } from "./AppProvider";

export const useAppContext = () => {
  const {
    name,
    description,
    version,
    dev,
    resolvedLanguage,
    dir,
    languages,
    setResolvedLanguage,
  } = useContext(AppContext);

  return {
    name,
    description,
    version,
    dev,
    resolvedLanguage,
    setResolvedLanguage,
    dir,
    languages,
  };
};
