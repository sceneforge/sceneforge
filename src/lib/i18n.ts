import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const i18nInit = () => {
  return i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ns: [
        "common",
        "tabs",
        "App",
        "AppInstall",
        "ModelViewer",
        "PanelSheet",
        "ReloadPrompt",
        "TabPanel",
      ],
      fallbackLng: "en",
      debug: true,
      backend: {
        loadPath: "/locales/{{lng}}/strings/{{ns}}.json",
      },
    });
};
