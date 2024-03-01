import { type IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IconProps {
  icon: "menu" | "close" | "settings" | "new-file" | "open-file" | "import-file" | "delete";
}

const iconMap: Record<IconProps["icon"], IconName> = {
  "menu": "bars",
  "close": "close",
  "settings": "cog",
  "new-file": "file",
  "open-file": "folder-open",
  "import-file": "file-import",
  "delete": "trash",
};

export const Icon = ({ icon }: IconProps) => {
  return (
    <FontAwesomeIcon icon={["fas", iconMap[icon]]} />
  );
};
