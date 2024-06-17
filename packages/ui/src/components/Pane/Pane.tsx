import * as stylex from "@stylexjs/stylex";
import { lazy, type PropsWithChildren } from "react"
import { backgroundColor } from "../tokens.stylex";
import type { PaneHeaderProps } from "./PaneHeader";
import type { PaneBodyProps } from "./PaneBody";

const PaneHeader = lazy(() => import("./PaneHeader"));
const PaneBody = lazy(() => import("./PaneBody"));

export type PaneProps = Partial<PaneHeaderProps> & PropsWithChildren<{
  inner?: boolean;
  actions?: PaneBodyProps["actions"];
}>;

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: backgroundColor.alpha10,
  },
  inner: {
    padding: "0.25rem",
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: backgroundColor.alpha10,
  }
});

const Pane = ({
  inner = true,
  children,
  title,
  level,
  toolbar,
  actions,
}: PaneProps) => {
  return (
    <section
      {...stylex.props(
        styles.container,
        inner && styles.inner
      )}
    >
      {title ? (
        <>
          <PaneHeader
            title={title}
            level={level}
            toolbar={toolbar}
            inner={inner}
          />
          <PaneBody actions={actions}>
            {children}
          </PaneBody>
        </>
      ) : children}

    </section>
  );
};

export default Pane;
