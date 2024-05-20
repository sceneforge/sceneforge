import {
  type ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { PanelContext } from "./PanelProvider";
import { useAppContext } from "../App";
import { useTranslation } from "react-i18next";

export const usePanel = () => {
  const {
    defaultAppTitle,
    appTitle,
    menuShow,
    sidePanelShow,
    sidePanelContent,
    overlayVisible,
    showWelcome,
    userData,
    setAppTitle,
    setMenuShow,
    setSidePanelShow,
    setSidePanelContent,
  } = useContext(PanelContext);
  const { t, i18n } = useTranslation();
  const { setResolvedLanguage, languages, resolvedLanguage } = useAppContext();
  const [showWelcomeState, setShowWelcomeState] = useState(showWelcome);

  const getUserData = useCallback(
    (
      store: string,
      key: string,
      callback: (value: unknown) => void,
      errorCallback?: (error: unknown) => void,
    ) => {
      if (userData) {
        userData
          .get(store, key)
          .then(callback)
          .catch(errorCallback ?? (() => void 0));
      }
    },
    [userData],
  );

  const getAllUserData = useCallback(
    (
      store: string,
      callback: (value: unknown[]) => void,
      errorCallback?: (error: unknown) => void,
    ) => {
      if (userData) {
        userData
          .getAll(store)
          .then(callback)
          .catch(errorCallback ?? (() => void 0));
      }
    },
    [userData],
  );

  const setUserData = useCallback(
    <T = unknown>(
      store: string,
      key: string,
      value: T,
      errorCallback?: (error: unknown) => void,
    ) => {
      if (userData) {
        return userData
          .setLast(store, key, value)
          .catch(errorCallback ?? (() => void 0));
      }
      return Promise.reject(new Error("userData is not available"));
    },
    [userData],
  );

  const removeUserData = useCallback(
    (store: string, key: string, errorCallback?: (error: unknown) => void) => {
      if (userData) {
        userData.remove(store, key).catch(errorCallback ?? (() => void 0));
      }
    },
    [userData],
  );

  const updateTitle = useCallback(
    (title?: string) => {
      if (setAppTitle) {
        setAppTitle(() => {
          if (title) {
            return title;
          } else if (defaultAppTitle) {
            return defaultAppTitle;
          }
        });
      }
    },
    [defaultAppTitle, setAppTitle],
  );

  const changeLanguage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value) {
        const language = e.target.value;
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
              .catch((err: unknown) => {
                throw new Error("Failed to change language", { cause: err });
              });
          })
          .catch((err: unknown) => {
            throw new Error("Failed to set language", { cause: err });
          });
      }
    },
    [setUserData, setResolvedLanguage, i18n],
  );

  const languageList = useMemo(() => {
    return languages?.map((locale) => ({
      local: t(`locales.${locale}`, {
        ns: "common",
        defaultValue: locale,
        lng: locale,
      }),
      translated: t(`locales.${locale}`, {
        ns: "common",
        defaultValue: locale,
      }),
      locale,
    }));
  }, [languages, resolvedLanguage, t]);

  const changeShowWelcome = useCallback(
    (show: boolean) => {
      setUserData("settings", "welcome", show).catch((err: unknown) => {
        throw new Error("Failed to set welcome setting", { cause: err });
      });
      setShowWelcomeState(show);
    },
    [setUserData],
  );

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
    setUserData,
    removeUserData,
    changeLanguage,
    languageList,
    showWelcomeState,
    changeShowWelcome,
  };
};
