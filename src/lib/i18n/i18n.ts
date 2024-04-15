import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resources from "virtual:i18next-loader";

export const i18nInit = async () => {
  return {
    languages: Object.keys(resources),
    i18n: await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        supportedLngs: Object.keys(resources),
        load: "all",
        fallbackLng: Object.keys(resources),
      }),
  };
};
