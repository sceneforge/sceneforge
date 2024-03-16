import { type PropsWithChildren } from "react";

export type PanelSheetBodyProps = PropsWithChildren;

export const PanelSheetBody = ({ children }: PanelSheetBodyProps) => {
  return (
    <div className="flex-grow flex flex-row justify-stretch p-2 gap-2 overflow-hidden">
      {children}
    </div>
  );
};
