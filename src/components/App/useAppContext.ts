import { useContext } from "react";
import { AppContext } from "./AppProvider";

export const useAppContext = () => {
  const { name, description, version, dev } = useContext(AppContext);

  return {
    name,
    description,
    version,
    dev,
  };
};
