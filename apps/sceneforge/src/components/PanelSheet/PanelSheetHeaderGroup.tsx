import { Button, Heading } from "@sceneforge/ui";
import { type PropsWithChildren, type ReactNode } from "react";

export type PanelSheetHeaderGroupProps = PropsWithChildren<{
  description?: ReactNode;
  title?: string;
}>;

export const PanelSheetHeaderGroup = ({
  children,
  description,
  title,
}: PanelSheetHeaderGroupProps) => {
  return (
    <>
      <div aria-label={title}>
        {title && !description && (
          <Heading level={3}>
            {title}
          </Heading>
        )}
        {title && description && (
          <Button label={title}>
            {description}
          </Button>
        )}
        {children}
      </div>
    </>
  );
};
