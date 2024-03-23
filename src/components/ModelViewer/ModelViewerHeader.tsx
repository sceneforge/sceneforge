import { Dispatch, useCallback, useMemo } from "react";
import { Dropdown } from "../Dropdown";
import {
  PanelSheetHeader,
  PanelSheetHeaderToolbar,
  type PanelSheetHeaderToolbarProps,
} from "../PanelSheet";
import { Mode } from "./mode";

export type ModelViewerHeaderProps = {
  title?: string;
  mode?: Mode;
  setMode?: Dispatch<Mode>;
};

const modeLabels = {
  [Mode.View]: "View Mode",
  [Mode.Edit]: "Edit Mode",
  [Mode.Material]: "Material Mode",
} as const;

const editToolbarItems: PanelSheetHeaderToolbarProps["items"] = [
  {
    title: "Objects",
    description: "Scene Objects management",
    actions: [
      {
        icon: "addCircle",
        title: "New Object",
      },
    ],
  },
  {
    title: "Hotspots",
    description: "Hotspots management",
    actions: [
      {
        icon: "fileMap",
        title: "Add",
      },
    ],
  },
  {
    title: "Select",
    description: "Mesh selection methods",
    actions: [
      {
        toggle: true,
        icon: "arrowSelectorTool",
        title: "Single Mesh",
      },
      {
        toggle: true,
        icon: "moveSelectionUp",
        title: "Parent Meshes",
      },
    ],
  },
];

export const ModelViewerHeader = ({
  title,
  mode = Mode.Edit,
  setMode,
}: ModelViewerHeaderProps) => {
  const modeLabel = useMemo(() => modeLabels[mode], [mode]);

  const handleModeChange = useCallback(
    (newMode: Mode) => () => setMode?.(newMode),
    [setMode]
  );

  return (
    <PanelSheetHeader
      editable
      name="model-name"
      title={title ?? "Untitled Model"}
    >
      <Dropdown
        contentVariant="default"
        label={modeLabel}
        className="m-0 b-none bg-transparent p-2 c-inherit"
        items={[
          {
            type: "item",
            label: "View Mode",
            onClick: handleModeChange(Mode.View),
          },
          {
            type: "item",
            label: "Edit Mode",
            onClick: handleModeChange(Mode.Edit),
          },
          {
            type: "item",
            label: "Material Mode",
            onClick: handleModeChange(Mode.Material),
          },
        ]}
      />
      {mode === Mode.Edit && (
        <PanelSheetHeaderToolbar items={editToolbarItems} />
      )}
    </PanelSheetHeader>
  );
};
