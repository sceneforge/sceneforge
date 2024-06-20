import { useCallback, useEffect, useState } from "react";

import { parseParams } from "../../lib/parseParams";
import {
  parseShortcutAction,
} from "../../lib/shortcutAction";

export const useAppShortcuts = () => {
  const [params, setParams] = useState<Record<string, unknown>>({});

  const hashChangeHandler = useCallback(
    (event: HashChangeEvent) => {
      if (event.newURL && URL.canParse(event.newURL)) {
        const url = new URL(event.newURL);
        setParams(parseParams(url.hash.replaceAll(/^#!/g, "")));
      }
    },
    [setParams]
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
    if (shortcutAction.action !== "none" && self?.location?.hash) {
      self.location.hash = "";
    }
  }, [params]);
};
