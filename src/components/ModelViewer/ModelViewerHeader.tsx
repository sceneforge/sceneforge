import { Dispatch, useCallback, useMemo } from "react";
import { PanelSheetHeader } from "../PanelSheet";
import { Mode } from "./mode";
import { Model } from "../../lib/isModel";
import { loadFile } from "../../lib/loadFile";
import { fileOpen } from "browser-fs-access";
import { useModelContext } from "../ModelContext";
import { Toolbar } from "../Toolbar";
import { useTabPanel } from "../TabPanel";
import { useTranslation } from "react-i18next";

export type ModelViewerHeaderProps = {
  model?: Model;
  mode?: Mode;
  setMode?: Dispatch<Mode>;
  onImported?: (model: Partial<Model>) => Promise<Model>;
};

export const ModelViewerHeader = ({
  model,
  mode = Mode.Edit,
  setMode,
  onImported,
}: ModelViewerHeaderProps) => {
  const { t } = useTranslation("ModelViewer");
  const modes = useMemo(
    () => ({
      view: t("modes.view"),
      edit: t("modes.edit"),
      material: t("modes.material"),
    }),
    [t],
  );
  const { updateModel } = useModelContext(model);
  const { updateTabTitle, activeTab } = useTabPanel();
  const modeLabel = useMemo(() => modes[mode], [modes, mode]);

  const handleModeChange = useCallback(
    (newMode: Mode) => () => setMode?.(newMode),
    [setMode],
  );

  const doImport = useCallback(async () => {
    const result = await fileOpen({
      description: t("ModelViewerHeader.fileImportDescription"),
      mimeTypes: ["model/gltf-binary", "model/gltf+json"],
      extensions: [".glb", ".gltf"],
      multiple: false,
      excludeAcceptAllOption: true,
    });
    const { blob } = await loadFile(result);
    if (onImported) {
      await onImported({
        id: model?.id,
        title: model?.title ?? t("ModelViewerHeader.untitled"),
        gltf: blob(),
        capture: undefined,
        createdAt: model?.createdAt ?? new Date(),
      });
    }
  }, [model, onImported, t]);

  const handleImport = useCallback(() => {
    doImport().catch((err: unknown) => {
      throw new Error("Failed to import model", { cause: err });
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
        } catch (e) {
          console.error(e);
        }
      }
    },
    [model, updateModel, activeTab, updateTabTitle],
  );

  return (
    <PanelSheetHeader
      editable={mode === Mode.Edit}
      name="model-name"
      title={model?.title ?? t("ModelViewerHeader.untitled")}
      onUpdate={handleModelNameChange}
    >
      <Toolbar
        icon="menu"
        contentVariant="default"
        items={[
          {
            type: "item",
            label: t("ModelViewerHeader.actions.modelDropdown"),
            items: [
              {
                type: "item",
                label: t("ModelViewerHeader.actions.importButton"),
                onClick: handleImport,
              },
            ],
          },
          {
            type: "item",
            label: modeLabel,
            items: [
              {
                type: "item",
                label: t("modes.view"),
                active: mode === Mode.View,
                onClick: handleModeChange(Mode.View),
              },
              {
                type: "item",
                label: t("modes.edit"),
                active: mode === Mode.Edit,
                onClick: handleModeChange(Mode.Edit),
              },
              {
                type: "item",
                label: t("modes.material"),
                active: mode === Mode.Material,
                onClick: handleModeChange(Mode.Material),
              },
            ],
          },
        ]}
      />
    </PanelSheetHeader>
  );
};
