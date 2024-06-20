import { Action, type ActionProps, Heading } from "@sceneforge/ui";
import { type PropsWithChildren } from "react";

export type PanelSheetSectionProps = PropsWithChildren<{
  actions?: ActionProps[];
  className?: string;
  title?: string;
}>;

export const PanelSheetSection = ({
  actions,
  children,
  title,
}: PanelSheetSectionProps) => {
  return (
    <section>
      <div>
        {title && (
          <Heading level={2}>
            {title}
          </Heading>
        )}
        {actions && actions.length > 0 && (
          <div>
            {actions.map((props, index) => (
              <Action
                key={index}
                {...props}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        {children}
      </div>
    </section>
  );
};
