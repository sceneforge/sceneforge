import { type IconName, type IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IconProps {
  prefix?: IconPrefix;
  icon: IconName;
}

export const Icon = ({ prefix = "fas", icon }: IconProps) => {
  return (
    <FontAwesomeIcon icon={[prefix, icon]} />
  );
};
