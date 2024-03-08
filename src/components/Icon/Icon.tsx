import { type IconName, type IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export interface IconProps extends Omit<FontAwesomeIconProps, "icon"> {
  prefix?: IconPrefix;
  icon: IconName;
}

export const Icon = ({ prefix = "fas", icon, ...props }: IconProps) => {
  return (
    <FontAwesomeIcon icon={[prefix, icon]} {...props} />
  );
};
