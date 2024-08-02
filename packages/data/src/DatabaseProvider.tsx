import { createContext, type PropsWithChildren, type RefObject, useRef } from "react";

import { type Database, database } from "./database";

export type DatabaseContextType = {
  db: RefObject<Database | null>;
};

export type DatabaseProviderProps = PropsWithChildren;

export const DatabaseContext = createContext<DatabaseContextType>({
  db: {
    current: null,
  },
});

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const db = useRef(database);

  return (
    <DatabaseContext value={{ db }}>
      {children}
    </DatabaseContext>
  );
};
