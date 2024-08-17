import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useState } from "react";

import { type SettingsValue, SettingsValueSchema } from "./database";
import { useDatabase } from "./useDatabase";

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

    SettingsValueSchema.parseAsync(currentValue)
      .then(async (parsedValue) => {
        if (
          parsedValue
          || (Array.isArray(parsedValue) && parsedValue.length > 0)
        ) {
          return await db?.settings.put({ key, value: parsedValue });
        }
        return await db?.settings.delete(key);
      })
      .then(() => {
        if (isPending) {
          setIsPending(false);
        }
      })
      .catch((error) => {
        console.error("Failed to save settings", error);
      })
      .finally(() => {
        if (isPending) {
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
