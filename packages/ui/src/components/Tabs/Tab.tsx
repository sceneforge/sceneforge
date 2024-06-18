import * as stylex from "@stylexjs/stylex";
import { type MouseEvent, useCallback } from "react";

import { IconEnum, Orientation, Position } from "../../types";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { backgroundColor, color } from "../tokens.stylex";

export type TabProps = {
  active?: boolean;
  closeable?: boolean;
  icon?: IconEnum;
  id: string;
  label: string;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
  orientation?: Orientation;
  position?: Position;
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
    border: "none",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    gap: "0.25rem",
    outline: {
      ":focus": "none",
      "default": "none",
    },
    paddingBlock: "0.5rem",
    paddingInline: "1rem",
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
    justifyContent: "stretch",
    margin: 0,
    padding: 0,
  },
});

const Tab = ({
  active,
  closeable,
  icon,
  id,
  label,
  // orientation = Orientation.Horizontal,
  // position = Position.Start,
  onTabChange,
  onTabClose,
}: TabProps) => {
  const handleTabChange = useCallback((
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    onTabChange?.(id);
  }, [onTabChange, id]);

  const handleTabClose = useCallback((
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    onTabClose?.(id);
  }, [onTabClose, id]);

  return (
    <div
      {...stylex.props(
        styles.container,
        active && styles.active
      )}
    >
      <button
        aria-controls={`${id}-panel`}
        aria-selected={active ? "true" : "false"}
        id={id}
        onClick={handleTabChange}
        role="tab"
        tabIndex={active ? 0 : -1}
        {...stylex.props(styles.button)}
      >
        {icon && <Icon icon={icon} />}
        {label}
      </button>
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
    </div>
  );
};

export default Tab;
