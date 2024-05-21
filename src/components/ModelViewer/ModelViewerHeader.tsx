import { fileOpen } from "browser-fs-access";
import { Dispatch, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Model } from "../../lib/isModel";
import { loadFile } from "../../lib/loadFile";
import { useModelContext } from "../ModelContext";
import { PanelSheetHeader } from "../PanelSheet";
import { useTabPanel } from "../TabPanel";
import { Toolbar } from "../Toolbar";
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
  const { updateModel } = useModelContext(model);
  const { activeTab, updateTabTitle } = useTabPanel();
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

  const handleModelNameChange = useCallback(
    async (value: string): Promise<void> => {
      if (model && model.id) {
        try {
          await updateModel(model.id, { title: value });
          if (activeTab) {
            updateTabTitle(activeTab.id, value);
          }
        }
        catch (error) {
          console.error(error);
        }
      }
    },
    [model, updateModel, activeTab, updateTabTitle]
  );

  return (
    <PanelSheetHeader
      editable={mode === Mode.Edit}
      name="model-name"
      onUpdate={handleModelNameChange}
      title={model?.title ?? t("ModelViewerHeader.untitled")}
    >
      <Toolbar
        contentVariant="default"
        icon="menu"
        items={[
          {
            items: [
              {
                label: t("ModelViewerHeader.actions.importButton"),
                onClick: handleImport,
                type: "item",
              },
            ],
            label: t("ModelViewerHeader.actions.modelDropdown"),
            type: "item",
          },
          {
            items: [
              {
                active: mode === Mode.View,
                label: t("modes.view"),
                onClick: handleModeChange(Mode.View),
                type: "item",
              },
              {
                active: mode === Mode.Edit,
                label: t("modes.edit"),
                onClick: handleModeChange(Mode.Edit),
                type: "item",
              },
              {
                active: mode === Mode.Material,
                label: t("modes.material"),
                onClick: handleModeChange(Mode.Material),
                type: "item",
              },
            ],
            label: modeLabel,
            type: "item",
          },
        ]}
      />
    </PanelSheetHeader>
  );
};
