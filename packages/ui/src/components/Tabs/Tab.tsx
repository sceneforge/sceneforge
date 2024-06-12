import * as stylex from "@stylexjs/stylex";
import { type MouseEvent, useCallback } from "react";
import { IconButton } from "../IconButton";
import { Icon } from "../Icon";
import { Orientation, Position, IconEnum } from "../../types";
import { backgroundColor, color } from "../tokens.stylex";

export type TabProps = {
  id: string;
  active?: boolean;
  icon?: IconEnum;
  label: string;
  onTabChange?: (id: string) => void;
  closeable?: boolean;
  onTabClose?: (id: string) => void;
  orientation?: Orientation;
  position?: Position;
};

const styles = stylex.create({
  container: {
    display: "flex",
    margin: 0,
    padding: 0,
    flexDirection: "row",
    justifyContent: "stretch",
    alignItems: "center",
    color: "inherit",
    backgroundColor: {
      default: "transparent",
      ":hover": backgroundColor.alpha20,
    },
  },
  active: {
    color: color.foreground,
    backgroundColor: {
      default: backgroundColor.alpha75,
      "@media (prefers-color-scheme: dark)": backgroundColor.alpha35,
    }
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.25rem",
    flexGrow: 1,
    backgroundColor: "transparent",
    color: "inherit",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    border: "none",
    cursor: "pointer",
    outline: {
      default: "none",
      ":focus": "none",
    },
  },
  closeButton: {
    flexShrink: 1,
    opacity: {
      default: 0,
      ":hover": 100,
    }
  },
  closeButtonActive: {
    opacity: {
      default: 50,
      ":hover": 100,
    }
  }
});

const Tab = ({
  id,
  active,
  label,
  icon,
  closeable,
  // orientation = Orientation.Horizontal,
  // position = Position.Start,
  onTabChange,
  onTabClose
}: TabProps) => {
  const handleTabChange = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    onTabChange?.(id);
  }, [onTabChange, id]);

  const handleTabClose = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    onTabClose?.(id);
  }, [onTabClose, id]);

  return (
    <div
      {...stylex.props(
        styles.container,
        active && styles.active,
      )}
    >
      <button
        id={id}
        role="tab"
        aria-controls={`${id}-panel`}
        aria-selected={active ? "true" : "false"}
        tabIndex={active ? 0 : -1}
        onClick={handleTabChange}
        {...stylex.props(styles.button)}
      >
        {icon && <Icon icon={icon} />}
        {label}
      </button>
      {closeable && (
        <IconButton
          icon={IconEnum.Close}
          style={[styles.closeButton, active && styles.closeButtonActive]}
          onClick={handleTabClose}
        />
      )}
    </div>
  );
};

export default Tab;
