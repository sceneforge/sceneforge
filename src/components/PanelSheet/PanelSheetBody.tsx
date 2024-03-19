import { type PropsWithChildren } from "react";

export type PanelSheetBodyProps = PropsWithChildren;

export const PanelSheetBody = ({ children }: PanelSheetBodyProps) => {
  return (
    <div className="flex flex-grow flex-row justify-stretch gap-2 overflow-hidden p-2">
      {children}
    </div>
  );
};
