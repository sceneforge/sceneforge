import { useLiveQuery as useDexieLiveQuery } from "dexie-react-hooks";
import { useCallback } from "react";

import type { Database } from "./database";

import { useDatabase } from "./useDatabase";

export type QueryCallback<T = unknown> = (db: Database) => Promise<T>;

export const useLiveQuery = <T = unknown>(
  queryCallback: QueryCallback<T>,
  deps?: Parameters<typeof useDexieLiveQuery<T>>[1]
) => {
  const db = useDatabase();

  const querier = useCallback(() => {
    if (db) {
      return queryCallback(db);
    }
    return Promise.resolve([] as T);
  }, [db, queryCallback]);

  return useDexieLiveQuery<T>(querier, [
    db,
    ...(
      Array.isArray(deps)
        ? deps as unknown[]
        : []
    ),
  ]);
};
