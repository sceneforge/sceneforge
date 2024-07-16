import * as stylex from "@stylexjs/stylex";
import { type Ref } from "react";

import { borderStyles, roundedStyles } from "../../borders.stylex";
import { colorStyles } from "../../colors.stylex";
import { IconEnum, Orientation, Variant } from "../../types";
import { ActionList, type ActionListProps } from "../ActionList";
import { Dialog } from "../Dialog";
import { Divider } from "../Divider";
import { IconButton } from "../IconButton";
import { View } from "../View";

export type CommandBarProps = {
  label?: string;
  latestCommands?: ActionListProps["actions"];
  name?: string;
  placeholder?: string;
  ref?: Ref<HTMLDialogElement>;
  suggestedCommands?: ActionListProps["actions"];
  variant?: Variant;
};

const styles = stylex.create({
  actions: {
    textAlign: "start",
    width: "100%",
  },
  closeButton: {
    display: {
      "@media only screen and (min-width: 768px)": "none",
      "default": null,
    },
    flexShrink: 1,
  },
  input: {
    flexGrow: 1,
    height: "2.5rem",
    paddingInline: "0.5rem",
    width: {
      "@media only screen and (min-width: 768px)": "40dvw",
      "default": "100%",
    },
  },
});

const CommandBar = ({
  label,
  latestCommands,
  name,
  placeholder = "Type a command...",
  ref,
  suggestedCommands,
  variant,
}: CommandBarProps) => {
  return (
    <Dialog
      aria-label={label}
      ref={ref}
      variant={variant}
    >
      <form method="dialog">
        <input
          autoFocus
          name={name}
          placeholder={placeholder}
          type="text"
          {...stylex.props(
            styles.input,
            colorStyles.default,
            borderStyles.border,
            borderStyles.borderSize(1),
            borderStyles.borderCurrentColor(25),
            roundedStyles.rounded(2)
          )}
        />
        <IconButton
          icon={IconEnum.Close}
          label="Close"
          style={styles.closeButton}
          type="submit"
        />
      </form>
      {latestCommands && (
        <View padding={0.25}>
          <Divider label="Latest Input" />
          <ActionList
            actions={latestCommands}
            actionsStyle={styles.actions}
            orientation={Orientation.Vertical}
          />
        </View>
      )}
      {suggestedCommands && (
        <View padding={0.25}>
          <Divider label="Suggested commands" />
          <ActionList
            actions={suggestedCommands}
            actionsStyle={styles.actions}
            orientation={Orientation.Vertical}
          />
        </View>
      )}
    </Dialog>
  );
};

export default CommandBar;
