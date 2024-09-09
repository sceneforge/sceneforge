import { lazy, type Ref } from "react";

import type { SplitPaneProps } from "./SplitPane";

import { Orientation } from "../../types";
import { type SplitPaneComponentRef, useSplitPane } from "./useSplitPane";

const SplitPane = lazy(() => import("./SplitPane"));

export type SplitPaneControllerProps = {
  ref?: Ref<SplitPaneComponentRef>;
} & Omit<SplitPaneProps, "ref">;

const SplitPaneController = ({
  children,
  orientation = Orientation.Horizontal,
  ref,
  resizable = false,
  ...props
}: SplitPaneControllerProps) => {
  const { splitPaneRef } = useSplitPane({
    orientation,
    ref,
    resizable,
  });

  return (
    <SplitPane
      {...props}
      orientation={orientation}
      ref={splitPaneRef}
      resizable={resizable}
    >
      {children}
    </SplitPane>
  );
};

export default SplitPaneController;
