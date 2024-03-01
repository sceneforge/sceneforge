import { ModelViewer } from "../../components/ModelViewer";
import { ModelProps } from "../../components/ModelViewer/ModelViewer";
import { Tab, TabProps } from "../../components/TabPanel";

export type ModelViewTabProps = TabProps<{
  active?: boolean;
}> & Omit<ModelProps, "capture">;

export const ModelViewTab = Tab(({
  active,
  id,
  title = "Untitled Model",
  gltf
}: ModelViewTabProps) => {
  return (
    <ModelViewer active={active} gltf={gltf} id={id} title={title} />
  );
});
