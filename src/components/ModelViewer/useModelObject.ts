import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { usePanel } from "../Panel";
import type { ModelProps } from "./ModelViewer";

export const useModelObject = ({ id, title, gltf, capture }: ModelProps) => {
  const { getUserData, setUserData } = usePanel();
  const [loadState, setLoadState] = useState<
    "none" | "loading" | "loaded" | "error"
  >("none");
  const [currentID, setCurrentID] = useState<string | undefined>(id);
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(title);
  const [currentGLTF, setCurrentGLTF] = useState<Blob | undefined>(gltf);
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
              if ("gltf" in data && data.gltf instanceof Blob) {
                setCurrentGLTF(data.gltf);
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
              resolve({ ...data, capture });
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
          gltf: currentGLTF,
          createdAt: now,
          updatedAt: now,
          capture,
        });
      }
    });
  }, [
    capture,
    currentID,
    getUserData,
    currentTitle,
    currentGLTF,
    setCurrentID,
    setCurrentTitle,
    setCurrentGLTF,
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
      gltf: currentGLTF,
      createdAt: currentCreatedAt,
      updatedAt: now,
      capture,
    });
  }, [
    capture,
    currentID,
    currentTitle,
    currentGLTF,
    currentCreatedAt,
    setUserData,
    setCurrentTitle,
  ]);

  const updateTitle = useCallback(
    (title: string) => {
      if (!currentID) return;
      setCurrentTitle(title);
      setCurrentUpdatedAt(new Date());
      setUserData("recentModels", currentID, {
        id: currentID,
        title: currentTitle,
        gltf: currentGLTF,
        createdAt: currentCreatedAt,
        updatedAt: currentUpdatedAt,
        capture,
      });
    },
    [
      capture,
      currentCreatedAt,
      currentGLTF,
      currentID,
      currentTitle,
      currentUpdatedAt,
      setUserData,
      setCurrentTitle,
      setCurrentUpdatedAt,
    ]
  );

  return {
    loadState,
    currentID,
    currentTitle,
    currentGLTF,
    currentCreatedAt,
    currentUpdatedAt,
    loadRecentModel,
    saveRecentModel,
    updateTitle,
  };
};
