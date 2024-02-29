import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { usePanel } from "../Panel";
import type { ModelViewerProps } from "./ModelViewer";

export const useModelObject = ({ id, title, glft }: ModelViewerProps) => {
  const { getUserData, setUserData } = usePanel();
  const [loadState, setLoadState] = useState<
    "none" | "loading" | "loaded" | "error"
  >("none");
  const [currentID, setCurrentID] = useState<string | undefined>(id);
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(title);
  const [currentGLFT, setCurrentGLFT] = useState<Blob | undefined>(glft);
  const [currentCreatedAt, setCurrentCreatedAt] = useState<Date | null>(null);
  const [currentUpdatedAt, setCurrentUpdatedAt] = useState<Date | null>(null);

  const loadRecentModel = useCallback(() => {
    setLoadState("loading");
    return new Promise((resolve, reject) => {
      if (currentID) {
        getUserData(
          "recentModels",
          currentID,
          (data) => {
            if (
              typeof data === "object" &&
              data !== null &&
              !Array.isArray(data)
            ) {
              if ("glft" in data && data.glft instanceof Blob) {
                setCurrentGLFT(data.glft);
              }
              if ("title" in data && typeof data.title === "string") {
                setCurrentTitle(data.title);
              }
              if ("createdAt" in data && data.createdAt instanceof Date) {
                setCurrentCreatedAt(data.createdAt);
              }
              if ("updatedAt" in data && data.updatedAt instanceof Date) {
                setCurrentUpdatedAt(data.updatedAt);
              }
              setLoadState("loaded");
              resolve(data);
            }
          },
          (error) => {
            setLoadState("error");
            reject(new Error("Failed to load recent model", { cause: error }));
          }
        );
      } else {
        const now = new Date();
        setCurrentID(uuid());
        setCurrentCreatedAt(now);
        setCurrentUpdatedAt(now);
        setLoadState("loaded");
        resolve({
          id: currentID,
          title: currentTitle,
          glft: currentGLFT,
          createdAt: now,
          updatedAt: now,
        });
      }
    });
  }, [
    currentID,
    getUserData,
    currentTitle,
    currentGLFT,
    setCurrentID,
    setCurrentTitle,
    setCurrentGLFT,
    setCurrentCreatedAt,
    setCurrentUpdatedAt,
    setLoadState,
  ]);

  const saveRecentModel = useCallback(() => {
    const now = new Date();
    if (!currentID) return;
    if (!currentTitle) setCurrentTitle("Untitled Model");
    setUserData("recentModels", currentID, {
      id: currentID,
      title: currentTitle,
      glft: currentGLFT,
      createdAt: currentCreatedAt,
      updatedAt: now,
    });
  }, [
    currentID,
    currentTitle,
    currentGLFT,
    currentCreatedAt,
    setUserData,
    setCurrentTitle,
  ]);

  return {
    loadState,
    currentID,
    currentTitle,
    currentGLFT,
    currentCreatedAt,
    currentUpdatedAt,
    loadRecentModel,
    saveRecentModel,
  };
};
