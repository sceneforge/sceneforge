import type { AriaAttributes, DOMAttributes } from "react";

declare module "react" {
  interface HTMLAttributes<T>
    extends AriaAttributes, DOMAttributes<T>, WithPopoverProps {
    popover?: "auto" | "manual" | "none";
    popovertargetaction?: "show" | "hide" | "toggle";
    anchor?: string;
  }
}
