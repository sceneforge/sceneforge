import { useContext, useMemo } from "react";

import { DatabaseContext } from "./DatabaseProvider";

export const useDatabase = () => {
  const { db } = useContext(DatabaseContext);

  return useMemo(() => db.current, [db]);
};
