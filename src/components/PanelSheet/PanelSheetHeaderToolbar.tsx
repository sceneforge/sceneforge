import { Action, ActionProps } from "../Action";
import { PanelSheetHeaderGroup } from "./PanelSheetHeaderGroup";

type ToolbarGroup = {
  title: string;
  description?: string;
  actions: ActionProps[];
};

export type PanelSheetHeaderToolbarProps = {
  items: ToolbarGroup[];
};

export const PanelSheetHeaderToolbar = ({
  items,
}: PanelSheetHeaderToolbarProps) => {
  return items.map(({ title, description, actions }, index) => (
    <PanelSheetHeaderGroup key={index} title={title} description={description}>
      {actions.map((action, index) => (
        <Action key={index} {...action} />
      ))}
    </PanelSheetHeaderGroup>
  ));
};
