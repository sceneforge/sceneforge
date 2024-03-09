import { useCallback, useContext } from "react";
import { PanelContext } from "./PanelProvider";

export const usePanel = () => {
  const {
    defaultAppTitle,
    appTitle,
    menuShow,
    sidePanelShow,
    sidePanelContent,
    overlayVisible,
    setAppTitle,
    setMenuShow,
    setSidePanelShow,
    setSidePanelContent,
    userData,
  } = useContext(PanelContext);

  const getUserData = useCallback((
    store: string,
    key: string,
    callback: (value: unknown) => void,
    errorCallback?: (error: unknown) => void
  ) => {
    if (userData) {
      userData.get(store, key)
        .then(callback)
        .catch(errorCallback ?? (() => void (0)));
    }
  }, [userData]);

  const getAllUserData = useCallback((
    store: string,
    callback: ((value: unknown[]) => void),
    errorCallback?: ((error: unknown) => void)
  ) => {
    if (userData) {
      userData.getAll(store)
        .then(callback)
        .catch(errorCallback ?? (() => void (0)));
    }
  }, [userData]);

  const setUserData = useCallback(<T = unknown>(
    store: string,
    key: string,
    value: T,
    errorCallback?: (error: unknown) => void
  ) => {
    if (userData) {
      userData.setLast(store, key, value)
        .catch(errorCallback ?? (() => void (0)));
    }
  }, [userData]);

  const updateTitle = useCallback((title?: string) => {
    if (setAppTitle) {
      setAppTitle(() => {
        if (title) {
          document.title = title;
          return title;
        }
        else if (defaultAppTitle) {
          document.title = defaultAppTitle;
          return defaultAppTitle;
        }
      });
    }
  }, [defaultAppTitle, setAppTitle]);

  return {
    defaultAppTitle,
    appTitle,
    updateTitle,
    overlayVisible,
    menuShow,
    sidePanelShow,
    setMenuShow,
    setSidePanelShow,
    sidePanelContent,
    setSidePanelContent,
    userData,
    getUserData,
    getAllUserData,
    setUserData
  };
};
