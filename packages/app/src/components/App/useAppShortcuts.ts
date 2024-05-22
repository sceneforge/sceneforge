import { useCallback, useEffect, useState } from "react";

import { useShortcuts } from "../../hooks/useShortcuts";
import { isEqual } from "../../lib/isEqual";
import { parseParams } from "../../lib/parseParams";
import {
  ShortcutActionType,
  parseShortcutAction,
} from "../../lib/shortcutAction";

export const useAppShortcuts = () => {
  const [params, setParams] = useState<Record<string, unknown>>({});
  const { shortcutActions } = useShortcuts();

  const hashChangeHandler = useCallback(
    (event: HashChangeEvent) => {
      if (event.newURL && URL.canParse(event.newURL)) {
        const url = new URL(event.newURL);
        setParams(parseParams(url.hash.replaceAll(/^#!/g, "")));
      }
    },
    [setParams]
  );

  const handleShortcutAction = useCallback(
    ({ action, params }: ShortcutActionType) => {
      const result = shortcutActions.find(a =>
        isEqual({ action: a.action, params: a.params }, { action, params }));
      if (result && result.callback) {
        return result.callback();
      }
    },
    [shortcutActions]
  );

  useEffect(() => {
    self.addEventListener("hashchange", hashChangeHandler, false);
    return () => {
      self.removeEventListener("hashchange", hashChangeHandler, false);
    };
  }, [hashChangeHandler]);

  useEffect(() => {
    if (self?.location?.hash) {
      setParams(parseParams(self.location.hash.replaceAll(/^#!/g, "")));
    }
  }, []);

  useEffect(() => {
    const shortcutAction = parseShortcutAction(params);
    if (shortcutAction.action !== "none") {
      handleShortcutAction(shortcutAction);
      if (self?.location?.hash) {
        self.location.hash = "";
      }
    }
  }, [handleShortcutAction, params]);
};
