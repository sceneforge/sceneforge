import { Toolbar } from "@sceneforge/ui";
import { fileOpen } from "browser-fs-access";
import { Dispatch, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Model } from "../../lib/isModel";
import { loadFile } from "../../lib/loadFile";
// import { useModelContext } from "../ModelContext";
import { Mode } from "./mode";

export type ModelViewerHeaderProps = {
  mode?: Mode;
  model?: Model;
  onImported?: (model: Partial<Model>) => Promise<Model>;
  setMode?: Dispatch<Mode>;
};

export const ModelViewerHeader = ({
  mode = Mode.Edit,
  model,
  onImported,
  setMode,
}: ModelViewerHeaderProps) => {
  const { t } = useTranslation("ModelViewer");
  const modes = useMemo(
    () => ({
      edit: t("modes.edit"),
      material: t("modes.material"),
      view: t("modes.view"),
    }),
    [t]
  );
  // const { updateModel } = useModelContext(model);
  const modeLabel = useMemo(() => modes[mode], [modes, mode]);

  const handleModeChange = useCallback(
    (newMode: Mode) => () => setMode?.(newMode),
    [setMode]
  );

  const doImport = useCallback(async () => {
    const result = await fileOpen({
      description: t("ModelViewerHeader.fileImportDescription"),
      excludeAcceptAllOption: true,
      extensions: [".glb", ".gltf"],
      mimeTypes: ["model/gltf-binary", "model/gltf+json"],
      multiple: false,
    });
    const { blob } = await loadFile(result);
    if (onImported) {
      await onImported({
        capture: undefined,
        createdAt: model?.createdAt ?? new Date(),
        gltf: blob(),
        id: model?.id,
        title: model?.title ?? t("ModelViewerHeader.untitled"),
      });
    }
  }, [model, onImported, t]);

  const handleImport = useCallback(() => {
    doImport().catch((error) => {
      throw new Error("Failed to import model", { cause: error });
    });
  }, [doImport]);

  // const handleModelNameChange = useCallback(
  //   async (value: string): Promise<void> => {
  //     if (model && model.id) {
  //       try {
  //         await updateModel(model.id, { title: value });
  //       }
  //       catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   },
  //   [model, updateModel]
  // );

  return (
    <Toolbar
      // icon="menu"
      actions={[
        {
          actions: [
            {
              kind: "button",
              label: t("ModelViewerHeader.actions.importButton"),
              onClick: handleImport,
            },
          ],
          kind: "dropdown",
          label: t("ModelViewerHeader.actions.modelDropdown"),
        },
        {
          actions: [
            {
              kind: "toggle",
              label: t("modes.view"),
              onClick: handleModeChange(Mode.View),
              pressed: mode === Mode.View,
            },
            {
              kind: "toggle",
              label: t("modes.edit"),
              onClick: handleModeChange(Mode.Edit),
              pressed: mode === Mode.Edit,
            },
            {
              kind: "toggle",
              label: t("modes.material"),
              onClick: handleModeChange(Mode.Material),
              pressed: mode === Mode.Material,
            },
          ],
          kind: "dropdown",
          label: modeLabel,
        },
      ]}
    />
  );
};
