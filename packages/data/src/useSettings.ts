import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useState } from "react";

import { useDatabase } from "./useDatabase";

export type SettingsValue =
  | (boolean | number | string)[]
  | boolean | number | string;

export type UseSettingsResult<T extends SettingsValue = SettingsValue> = [
  T | undefined,
  ((currentValue: T) => void),
  boolean,
  boolean,
];

export const useSettings = <T extends SettingsValue = SettingsValue>(
  key: string,
  defaultValue?: T
): UseSettingsResult<T> => {
  const [isPending, setIsPending] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const db = useDatabase();

  const value = useLiveQuery(async () => {
    const result = await db?.settings.get(key);

    setIsPending(false);

    if (result) {
      return result.value as T;
    }
    return;
  }, [db, key]);

  const setValue = useCallback((currentValue: T) => {
    if (!isPending) {
      setIsUpdating(true);
    }
    db?.settings.put({ key, value: currentValue })
      .then(() => {
        if (!isPending) {
          setIsUpdating(false);
        }
      })
      .catch(() => {
        if (!isPending) {
          setIsUpdating(false);
        }
      });
  }, [db, key, isPending]);

  useEffect(() => {
    if (value === undefined && !isPending && defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue, isPending, setValue, value]);

  return [
    value,
    setValue,
    isPending,
    isUpdating,
  ];
};
