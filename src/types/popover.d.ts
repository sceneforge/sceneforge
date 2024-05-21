import type { AriaAttributes, DOMAttributes } from "react";

declare module "react" {
  interface HTMLAttributes<T>
    extends AriaAttributes, DOMAttributes<T>, WithPopoverProps {
    anchor?: string;
    popover?: "auto" | "manual" | "none";
    popovertargetaction?: "hide" | "show" | "toggle";
  }
}
