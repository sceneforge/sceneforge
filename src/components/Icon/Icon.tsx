import { IconClose } from "./IconClose";
import type { IconMenuProps } from "./IconMenu";
import { IconMenu } from "./IconMenu";
import { IconNewFile } from "./IconNewFile";
import { IconOpenFile } from "./IconOpenFile";

export type IconProps = (
  | (IconMenuProps & { icon: "menu" })
  | { icon: "open-file" | "new-file" | "close" }
) & { inverted?: boolean };

export const Icon = ({ icon, ...props }: IconProps) => {
  switch (icon) {
    case "menu":
      return <IconMenu {...props} />;
    case "open-file":
      return <IconOpenFile {...props} />;
    case "new-file":
      return <IconNewFile {...props} />;
    case "close":
      return <IconClose {...props} />;
    default:
      return null;
  }
};
