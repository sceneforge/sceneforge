import { useEffect, useState } from "react";
import { type ModelViewerProps } from "../../components/ModelViewer";
import { usePanel } from "../../components/Panel";

export const useRecentModels = (active = true) => {
  const [recentModels, setRecentModels] = useState<ModelViewerProps[]>([]);
  const { getAllUserData } = usePanel();

  useEffect(() => {
    if (active) {
      getAllUserData("recentModels", (data) => {
        setRecentModels([]);
        if (Array.isArray(data)) {
          for (const model of data) {
            if (
              typeof model === "object" &&
              !Array.isArray(model) &&
              model !== null
            ) {
              const title =
                "title" in model && typeof model.title === "string"
                  ? model.title
                  : undefined;
              const id =
                "id" in model && typeof model.id === "string"
                  ? model.id
                  : undefined;
              const gltf =
                "gltf" in model && model.gltf instanceof Blob
                  ? model.gltf
                  : undefined;

              setRecentModels((prev) => [...prev, { title, id, gltf }]);
            }
          }
        }
      });
    }
  }, [active, getAllUserData, setRecentModels]);

  return {
    recentModels,
  };
};
