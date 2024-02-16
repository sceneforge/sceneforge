import type { IconMenuProps } from "./IconMenu";
import { IconMenu } from "./IconMenu";
import { IconOpenFile } from "./IconOpenFile";

export type IconProps = (IconMenuProps & { icon: "menu" }) | { icon: "open-file" };

export const Icon = ({ icon, ...props }: IconProps) => {
  switch (icon) {
    case "menu":
      return <IconMenu {...props} />;
    case "open-file":
      return <IconOpenFile />;
    default:
      return null;
  }  
};