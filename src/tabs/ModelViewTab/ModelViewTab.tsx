import { ModelViewer } from "../../components/ModelViewer";
import { Tab, TabProps } from "../../components/TabPanel";

export type ModelViewTabProps = TabProps<{
  gltf: File;
}>;

export const ModelViewTab = Tab(({ gltf }: ModelViewTabProps) => {
  return (
    <ModelViewer glft={gltf} />
  );
});
