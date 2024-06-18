export type OpenTabActionType = {
  action: "open-tab";
  params: {
    tab: string;
  };
};

export type NewTabActionType = {
  action: "new-tab";
  params: {
    tab: string;
  };
};

export type NoneActionType = {
  action: "none";
  params?: null;
};

export type ShortcutActionType =
  | NewTabActionType
  | NoneActionType
  | OpenTabActionType;

export const isShortcutActionType = (
  shortcutAction: unknown
): shortcutAction is ShortcutActionType => {
  if (typeof shortcutAction !== "object" || !shortcutAction) return false;
  if (Array.isArray(shortcutAction)) return false;
  if (!("action" in shortcutAction)) return false;
  if (typeof shortcutAction.action !== "string") return false;
  if (!("params" in shortcutAction)) return false;
  if (typeof shortcutAction.params !== "object") return false;
  if (Array.isArray(shortcutAction.params)) return false;

  switch (shortcutAction.action) {
    case "open-tab":
    case "new-tab":
      if (shortcutAction.params === null) return false;
      if (!("tab" in shortcutAction.params)) return false;
      break;
    case "none":
      if (shortcutAction.params !== null) return false;
      break;
    default:
      return false;
  }

  return true;
};
