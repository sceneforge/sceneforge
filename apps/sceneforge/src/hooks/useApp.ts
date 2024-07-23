import { useSettings } from "@sceneforge/data";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { dataset } from "../lib/dataset";
import { useAppContext } from "./useAppContext";

export const useApp = () => {
  const { setOverlayVisible } = useAppContext();
  const { i18n } = useTranslation();
  const [language] = useSettings("language", i18n.resolvedLanguage);

  const windowControlsOverlayRef = useRef(
    window.navigator?.windowControlsOverlay
  );

  const updateOverlayVisibility = useCallback(() => {
    if (windowControlsOverlayRef.current) {
      setOverlayVisible(Boolean(windowControlsOverlayRef.current?.visible));
      dataset(document.body, "windowControlsOverlay", windowControlsOverlayRef.current.visible ? "visible" : "hidden");
    }
  }, [windowControlsOverlayRef, setOverlayVisible]);

  useEffect(() => {
    if (windowControlsOverlayRef.current) {
      const windowControlsOverlay = windowControlsOverlayRef.current;

      windowControlsOverlay.addEventListener(
        "geometrychange",
        updateOverlayVisibility
      );

      dataset(document.body, "windowControlsOverlay", windowControlsOverlay.visible ? "visible" : "hidden");

      return () => {
        windowControlsOverlay.removeEventListener(
          "geometrychange",
          updateOverlayVisibility
        );
      };
    }
  }, [updateOverlayVisibility, windowControlsOverlayRef]);

  useEffect(() => {
    if (
      i18n
      && i18n.resolvedLanguage !== undefined
      && language !== undefined
      && i18n.resolvedLanguage !== language
    ) {
      void i18n.changeLanguage(language);
    }
  }, [language, i18n]);
};
