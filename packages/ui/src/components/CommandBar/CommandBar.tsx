import * as stylex from "@stylexjs/stylex";
import { type Ref } from "react";

import { IconEnum, Variant } from "../../types";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Divider } from "../Divider";
import { IconButton } from "../IconButton";
import { View } from "../View";
import { color, foregroundColor } from "../tokens.stylex";

export type CommandBarProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  ref?: Ref<HTMLDialogElement>;
  variant?: Variant;
};

const styles = stylex.create({
  closeButton: {
    display: {
      "@media only screen and (min-width: 768px)": "none",
      "default": null,
    },
    flexShrink: 1,
  },
  input: {
    backgroundColor: color.background,
    borderColor: foregroundColor.alpha25,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "0.0625rem",
    color: color.foreground,
    flexGrow: 1,
    height: "2.5rem",
    paddingInline: "0.5rem",
    width: {
      "@media only screen and (min-width: 768px)": "40dvw",
      "default": "100%",
    },
  },
  list: {
    display: "grid",
    gridAutoFlow: "row",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  listOption: {
    textAlign: "start",
    width: "100%",
  },
});

const CommandBar = ({
  label,
  name,
  placeholder = "Type a command...",
  ref,
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
            styles.input
          )}
        />
        <IconButton
          icon={IconEnum.Close}
          label="Close"
          style={styles.closeButton}
          type="submit"
        />
      </form>
      <View padding={0.25}>
        <Divider label="Latest Input" />
        <ul {...stylex.props(styles.list)}>
          <li>
            <Button style={styles.listOption}>
              Command 1
            </Button>
          </li>
          <li>
            <Button style={styles.listOption}>
              Command 2
            </Button>
          </li>
          <li>
            <Button style={styles.listOption}>
              Command 3
            </Button>
          </li>
          <li>
            <Button style={styles.listOption}>
              Command 4
            </Button>
          </li>
        </ul>
        <Divider label="Suggest" />
        <ul {...stylex.props(styles.list)}>
          <li>
            <Button style={styles.listOption}>
              Suggested Command 1
            </Button>
          </li>
          <li>
            <Button style={styles.listOption}>
              Suggested Command 2
            </Button>
          </li>
          <li>
            <Button style={styles.listOption}>
              Suggested Command 3
            </Button>
          </li>
          <li>
            <Button style={styles.listOption}>
              Suggested Command 4
            </Button>
          </li>
        </ul>
      </View>
    </Dialog>
  );
};

export default CommandBar;
