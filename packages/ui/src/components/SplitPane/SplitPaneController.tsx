import { type PropsWithChildren, lazy } from "react";

import { Orientation } from "../../types";
import { useSplitPane } from "./useSplitPane";

const SplitPane = lazy(() => import("./SplitPane"));

export type SplitPaneControllerProps = PropsWithChildren<{
  orientation?: Orientation;
  resizable?: boolean;
}>;

const SplitPaneController = ({
  children,
  orientation = Orientation.Horizontal,
  resizable = false,
}: SplitPaneControllerProps) => {
  const { splitPaneRef } = useSplitPane({ orientation, resizable });

  return (
    <SplitPane
      orientation={orientation}
      ref={splitPaneRef}
      resizable={resizable}
    >
      {children}
    </SplitPane>
  );
};

export default SplitPaneController;
