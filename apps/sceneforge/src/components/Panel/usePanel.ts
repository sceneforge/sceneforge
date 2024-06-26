import {
  type ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { useAppContext } from "../App";
import { PanelContext } from "./PanelProvider";

export const usePanel = () => {
  const {
    appTitle,
    defaultAppTitle,
    menuShow,
    overlayVisible,
    setAppTitle,
    setMenuShow,
    setSidePanelContent,
    setSidePanelShow,
    showWelcome,
    sidePanelContent,
    sidePanelShow,
    userData,
  } = useContext(PanelContext);
  const { i18n, t } = useTranslation();
  const { languages, setResolvedLanguage } = useAppContext();
  const [showWelcomeState, setShowWelcomeState] = useState(showWelcome);

  const getUserData = useCallback(
    (
      store: string,
      key: string,
      callback: (value: unknown) => void,
      errorCallback?: (error: unknown) => void
    ) => {
      if (userData) {
        userData
          .get(store, key)
          .then(callback)
          .catch(errorCallback ?? (() => void 0));
      }
    },
    [userData]
  );

  const getAllUserData = useCallback(
    (
      store: string,
      callback: (value: unknown[]) => void,
      errorCallback?: (error: unknown) => void
    ) => {
      if (userData) {
        userData
          .getAll(store)
          .then(callback)
          .catch(errorCallback ?? (() => void 0));
      }
    },
    [userData]
  );

  const setUserData = useCallback(
    <T = unknown>(
      store: string,
      key: string,
      value: T,
      errorCallback?: (error: unknown) => void
    ) => {
      if (userData) {
        return userData
          .setLast(store, key, value)
          .catch(errorCallback ?? (() => void 0));
      }
      return Promise.reject(new Error("userData is not available"));
    },
    [userData]
  );

  const removeUserData = useCallback(
    (store: string, key: string, errorCallback?: (error: unknown) => void) => {
      if (userData) {
        userData.remove(store, key).catch(errorCallback ?? (() => void 0));
      }
    },
    [userData]
  );

  const updateTitle = useCallback(
    (title?: string) => {
      if (setAppTitle) {
        setAppTitle(() => {
          if (title) {
            return title;
          }
          else if (defaultAppTitle) {
            return defaultAppTitle;
          }
        });
      }
    },
    [defaultAppTitle, setAppTitle]
  );

  const changeLanguage = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value) {
        const language = event.target.value;
        setUserData("settings", "language", language)
          .then(() => {
            if (setResolvedLanguage) {
              setResolvedLanguage(language);
            }
            i18n
              .changeLanguage(language)
              .then(() => {
                i18n.dir(language);
              })
              .catch((error: unknown) => {
                throw new Error("Failed to change language", { cause: error });
              });
          })
          .catch((error: unknown) => {
            throw new Error("Failed to set language", { cause: error });
          });
      }
    },
    [setUserData, setResolvedLanguage, i18n]
  );

  const languageList = useMemo(() => {
    return languages?.map(locale => ({
      local: t(`locales.${locale}`, {
        defaultValue: locale,
        lng: locale,
        ns: "common",
      }),
      locale,
      translated: t(`locales.${locale}`, {
        defaultValue: locale,
        ns: "common",
      }),
    }));
  }, [languages, t]);

  const changeShowWelcome = useCallback(
    (show: boolean) => {
      setUserData("settings", "welcome", show).catch((error: unknown) => {
        throw new Error("Failed to set welcome setting", { cause: error });
      });
      setShowWelcomeState(show);
    },
    [setUserData]
  );

  return {
    appTitle,
    changeLanguage,
    changeShowWelcome,
    defaultAppTitle,
    getAllUserData,
    getUserData,
    languageList,
    menuShow,
    overlayVisible,
    removeUserData,
    setMenuShow,
    setSidePanelContent,
    setSidePanelShow,
    setUserData,
    showWelcomeState,
    sidePanelContent,
    sidePanelShow,
    updateTitle,
    userData,
  };
};
