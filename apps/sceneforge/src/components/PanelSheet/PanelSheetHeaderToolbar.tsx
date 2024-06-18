import { Action, type ActionProps } from "@sceneforge/ui";

import { PanelSheetHeaderGroup } from "./PanelSheetHeaderGroup";

type ToolbarGroup = {
  actions: ActionProps[];
  description?: string;
  title: string;
};

export type PanelSheetHeaderToolbarProps = {
  items: ToolbarGroup[];
};

export const PanelSheetHeaderToolbar = ({
  items,
}: PanelSheetHeaderToolbarProps) => {
  return items.map(({ actions, description, title }, index) => (
    <PanelSheetHeaderGroup description={description} key={index} title={title}>
      {actions.map((action, index) => (
        <Action key={index} {...action} />
      ))}
    </PanelSheetHeaderGroup>
  ));
};
