import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useState,
} from "react";
import { type Model } from "../../lib/isModel";

export type ModelContextProviderProps = PropsWithChildren;

export type ModelContextType = {
  models: Model[];
  setModels: Dispatch<SetStateAction<Model[]>>;
  loaded: boolean;
  setLoaded: Dispatch<SetStateAction<boolean>>;
  loadState: "none" | "loading" | "loaded" | "error";
  setLoadState: Dispatch<
    SetStateAction<"none" | "loading" | "loaded" | "error">
  >;
};

export const ModelContext = createContext<ModelContextType>({
  models: [],
  setModels: () => {},
  loaded: false,
  setLoaded: () => {},
  loadState: "none",
  setLoadState: () => {},
});

export const ModelContextProvider = ({
  children,
}: ModelContextProviderProps) => {
  const [models, setModels] = useState<Model[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadState, setLoadState] = useState<
    "none" | "loading" | "loaded" | "error"
  >("none");

  return (
    <ModelContext.Provider
      value={{
        models,
        loaded,
        loadState,
        setModels,
        setLoaded,
        setLoadState,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
