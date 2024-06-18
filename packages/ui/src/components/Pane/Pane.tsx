import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren, lazy } from "react";

import type { PaneBodyProps } from "./PaneBody";
import type { PaneHeaderProps } from "./PaneHeader";

import { backgroundColor } from "../tokens.stylex";

const PaneHeader = lazy(() => import("./PaneHeader"));
const PaneBody = lazy(() => import("./PaneBody"));

export type PaneProps = Partial<PaneHeaderProps> & PropsWithChildren<{
  actions?: PaneBodyProps["actions"];
  inner?: boolean;
}>;

const styles = stylex.create({
  container: {
    backgroundColor: backgroundColor.alpha10,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  inner: {
    borderColor: backgroundColor.alpha10,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    padding: "0.25rem",
  },
});

const Pane = ({
  actions,
  children,
  inner = true,
  level,
  title,
  toolbar,
}: PaneProps) => {
  return (
    <section
      {...stylex.props(
        styles.container,
        inner && styles.inner
      )}
    >
      {title
        ? (
          <>
            <PaneHeader
              inner={inner}
              level={level}
              title={title}
              toolbar={toolbar}
            />
            <PaneBody actions={actions}>
              {children}
            </PaneBody>
          </>
        )
        : children}

    </section>
  );
};

export default Pane;
