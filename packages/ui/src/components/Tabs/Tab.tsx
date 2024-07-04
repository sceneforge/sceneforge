import * as stylex from "@stylexjs/stylex";

import type { TabCloseCallback } from "./TabPanel";

import { IconEnum, Orientation, Position, Variant } from "../../types";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { View } from "../View";
import { backgroundColor, color } from "../tokens.stylex";
import { useTab } from "./useTab";

export type TabProps = {
  active?: boolean;
  afterClose?: TabCloseCallback;
  beforeClose?: TabCloseCallback;
  closeable?: boolean;
  icon?: IconEnum;
  id: string;
  label: string;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
  orientation?: Orientation;
  position?: Position;
  variant?: Variant;
};

const styles = stylex.create({
  active: {
    backgroundColor: {
      "@media (prefers-color-scheme: dark)": backgroundColor.alpha35,
      "default": backgroundColor.alpha75,
    },
    color: color.foreground,
  },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "nowrap",
    gap: "0.25rem",
    outline: {
      ":focus": "none",
      "default": "none",
    },
    textWrap: "nowrap",
  },
  closeButton: {
    flexShrink: 1,
    opacity: {
      ":hover": 100,
      "default": 0,
    },
  },
  closeButtonActive: {
    opacity: {
      ":hover": 100,
      "default": 50,
    },
  },
  container: {
    alignItems: "center",
    backgroundColor: {
      ":hover": backgroundColor.alpha20,
      "default": "transparent",
    },
    color: "inherit",
    display: "flex",
    flexDirection: "row",
    height: null,
    justifyContent: "stretch",
    width: null,
  },
  noVariantActive: {
    backgroundColor: "SelectedItem",
    color: "SelectedItemText",
  },
});

const Tab = ({
  active,
  afterClose,
  beforeClose,
  closeable,
  icon,
  id,
  label,
  onTabChange,
  onTabClose,
  variant,
}: TabProps) => {
  const {
    handleTabChange,
    handleTabClose,
  } = useTab({
    afterClose,
    beforeClose,
    id,
    onTabChange,
    onTabClose,
  });

  return (
    <View
      style={[
        styles.container,
        active && styles.active,
        (!variant && active) && styles.noVariantActive,
      ]}
    >
      <Button
        aria-controls={`${id}-panel`}
        aria-selected={active ? "true" : "false"}
        id={id}
        onClick={handleTabChange}
        padding={{
          block: 0.5,
          inline: 1,
        }}
        role="tab"
        style={styles.button}
        tabIndex={active ? 0 : -1}
      >
        {icon && <Icon icon={icon} />}
        {label}
      </Button>
      {closeable && (
        <IconButton
          icon={IconEnum.Close}
          onClick={handleTabClose}
          style={[
            styles.closeButton,
            active && styles.closeButtonActive,
          ]}
        />
      )}
    </View>
  );
};

export default Tab;
