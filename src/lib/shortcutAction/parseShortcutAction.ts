import {
  type ShortcutActionType,
  isShortcutActionType,
} from "./isShortcutActionType";

export const parseShortcutAction = (
  params?: Record<string, unknown>,
): ShortcutActionType => {
  if (!params) {
    return {
      action: "none",
      params: null,
    };
  }

  if ("action" in params) {
    const { action, ...rest } = params;
    const shortcutAction = { action, params: rest };
    if (isShortcutActionType(shortcutAction)) {
      return shortcutAction;
    }
  }

  return {
    action: "none",
    params: null,
  };
};
