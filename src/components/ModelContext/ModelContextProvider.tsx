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
  loadState: "error" | "loaded" | "loading" | "none";
  loaded: boolean;
  models: Model[];
  setLoadState: Dispatch<
    SetStateAction<"error" | "loaded" | "loading" | "none">
  >;
  setLoaded: Dispatch<SetStateAction<boolean>>;
  setModels: Dispatch<SetStateAction<Model[]>>;
};

export const ModelContext = createContext<ModelContextType>({
  loadState: "none",
  loaded: false,
  models: [],
  setLoadState: () => {},
  setLoaded: () => {},
  setModels: () => {},
});

export const ModelContextProvider = ({
  children,
}: ModelContextProviderProps) => {
  const [models, setModels] = useState<Model[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadState, setLoadState] = useState<
    "error" | "loaded" | "loading" | "none"
  >("none");

  return (
    <ModelContext.Provider
      value={{
        loadState,
        loaded,
        models,
        setLoadState,
        setLoaded,
        setModels,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
