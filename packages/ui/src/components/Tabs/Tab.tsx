import * as stylex from "@stylexjs/stylex";

import type { TabCloseCallback } from "./TabPanel";

import { roundedStyles } from "../../borders.stylex";
import { backgroundColor, foregroundColor } from "../../colors.stylex";
import { glossyInteractiveStyles } from "../../effect.stylex";
import { IconEnum, Orientation, Position, Variant } from "../../types";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { UnlistedItem } from "../Unlisted";
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
    color: foregroundColor.default,
  },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    boxShadow: {
      ":active": null,
      ":focus": null,
      "default": null,
    },
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "nowrap",
    gap: "0.25rem",
    outline: {
      ":active": "none",
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
    flexWrap: "nowrap",
    justifyContent: "stretch",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
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
  orientation,
  position,
  variant,
}: TabProps) => {
  const {
    buttonRef,
    handleTabClose,
  } = useTab({
    afterClose,
    beforeClose,
    closeable,
    id,
    onTabChange,
    onTabClose,
  });

  return (
    <UnlistedItem
      style={[
        styles.container,
        active && styles.active,
        (!variant && active) && styles.noVariantActive,
        orientation === Orientation.Horizontal
        && (
          position === Position.End
            ? roundedStyles.roundedBlockEnd(2)
            : roundedStyles.roundedBlockStart(2)
        ),
        orientation === Orientation.Vertical && (
          position === Position.End
            ? roundedStyles.roundedInlineEnd(2)
            : roundedStyles.roundedInlineStart(2)
        ),
        active && variant && glossyInteractiveStyles.inverted(variant),
      ]}
    >
      <Button
        aria-controls={`${id}-panel`}
        aria-selected={active ? "true" : "false"}
        id={id}
        padding={{
          block: 0.5,
          inline: 1,
        }}
        ref={buttonRef}
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
          scale={false}
          size={3}
          style={[
            styles.closeButton,
            active && styles.closeButtonActive,
          ]}
          tabIndex={-1}
        />
      )}
    </UnlistedItem>
  );
};

export default Tab;
