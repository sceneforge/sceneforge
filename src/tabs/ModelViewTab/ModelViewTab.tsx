import { ModelViewer } from "../../components/ModelViewer";
import { Tab, TabProps } from "../../components/TabPanel";
import { Model } from "../../lib/isModel";

export type ModelViewTabProps = TabProps<{
  active?: boolean;
}> &
  Omit<Model & { title?: string }, "capture">;

export const ModelViewTab = Tab(
  ({ active, id, title = "Untitled Model", gltf }: ModelViewTabProps) => {
    return <ModelViewer active={active} gltf={gltf} id={id} title={title} />;
  }
);
