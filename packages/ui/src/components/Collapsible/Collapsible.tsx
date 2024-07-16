import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren, useId } from "react";

import { roundedStyles } from "../../borders.stylex";
import { colorStyles } from "../../colors.stylex";
import { glossyInteractiveStyles } from "../../effect.stylex";
import { IconEnum, type Variant } from "../../types";
import { Icon } from "../Icon";
import { View, type ViewProps } from "../View";

export type CollapsibleProps = PropsWithChildren<{
  contentMargin?: ViewProps["margin"];
  contentPadding?: ViewProps["padding"];
  icon?: IconEnum;
  id?: string;
  open?: boolean;
  style?: StyleXStyles;
  title?: string;
  variant?: Variant;
}>;

const styles = stylex.create({
  collapseExpandIcon: {
    flexShrink: 1,
    rotate: "var(--_current_icon_position, 0deg)",
    transition: "rotate 0.125s ease-in-out",
  },
  container: {
    height: {
      ":is([open])": "100%",
      "default": "auto",
    },
    margin: 0,
    overflow: "clip",
    padding: 0,
    width: "100%",
  },
  containerState: {
    "--_current_icon_position": {
      ":is([open])": "180deg",
      "default": "0deg",
    },
  },
  content: {
    height: "auto",
    maxHeight: "100%",
    maxWidth: null,
    width: "100%",
  },
  icon: {
    flexShrink: 1,
  },
  summary: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    fontWeight: 500,
    gap: "0.5rem",
    height: null,
    justifyContent: "stretch",
    listStyle: "none",
    margin: 0,
    padding: "0.25rem 0.5rem",
    width: "100%",
  },
  title: {
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    textWrap: "nowrap",
  },
});

const Collapsible = ({
  children,
  contentMargin,
  contentPadding,
  icon,
  id,
  open,
  style,
  title,
  variant,
}: CollapsibleProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <details
      id={currentId}
      open={open}
      {...stylex.props(
        styles.container,
        roundedStyles.rounded(1),
        variant && colorStyles.variant(variant),
        styles.containerState,
        style
      )}
    >
      <summary
        {...stylex.props(
          styles.summary,
          variant && glossyInteractiveStyles.variant(variant)
        )}
      >
        {icon && (<Icon icon={icon} style={styles.icon} />)}
        <span
          {...stylex.props(styles.title)}
        >
          {title}
        </span>
        <Icon
          icon={IconEnum.ExpandMore}
          style={styles.collapseExpandIcon}
        />
      </summary>
      <View
        margin={contentMargin}
        padding={contentPadding}
        scrollable
        style={styles.content}
      >
        {children}
      </View>
    </details>
  );
};

export default Collapsible;
