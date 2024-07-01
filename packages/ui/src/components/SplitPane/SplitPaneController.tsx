import { lazy } from "react";

import type { SplitPaneProps } from "./SplitPane";

import { Orientation } from "../../types";
import { useSplitPane } from "./useSplitPane";

const SplitPane = lazy(() => import("./SplitPane"));

export type SplitPaneControllerProps = Omit<SplitPaneProps, "ref">;

const SplitPaneController = ({
  children,
  orientation = Orientation.Horizontal,
  resizable = false,
  ...props
}: SplitPaneControllerProps) => {
  const { splitPaneRef } = useSplitPane({ orientation, resizable });

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
