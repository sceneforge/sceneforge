import { useCallback, useEffect, useState } from "react";
import { parseParams } from "../../lib/parseParams";
import {
  ShortcutActionType,
  parseShortcutAction,
} from "../../lib/shortcutAction";
import { useShortcuts } from "../../hooks/useShortcuts";
import { isEqual } from "../../lib/isEqual";

export const useAppShortcuts = () => {
  const [params, setParams] = useState<Record<string, unknown>>({});
  const { shortcutActions } = useShortcuts();

  const hashChangeHandler = useCallback(
    (ev: HashChangeEvent) => {
      if (ev.newURL && URL.canParse(ev.newURL)) {
        const url = new URL(ev.newURL);
        setParams(parseParams(url.hash.replace(/^#!/g, "")));
      }
    },
    [setParams],
  );

  const handleShortcutAction = useCallback(
    ({ action, params }: ShortcutActionType) => {
      const result = shortcutActions.find((a) =>
        isEqual({ action: a.action, params: a.params }, { action, params }),
      );
      if (result && result.callback) {
        return result.callback();
      }
    },
    [shortcutActions],
  );

  useEffect(() => {
    self.addEventListener("hashchange", hashChangeHandler, false);
    return () => {
      self.removeEventListener("hashchange", hashChangeHandler, false);
    };
  }, []);

  useEffect(() => {
    if (self?.location?.hash) {
      setParams(parseParams(self.location.hash.replace(/^#!/g, "")));
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
  }, [params]);
};
