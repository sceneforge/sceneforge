import { ModelViewer } from "../../components/ModelViewer";
import { Tab, TabProps } from "../../components/TabPanel";

export type ModelViewTabProps = TabProps<{
  active?: boolean;
  id?: string;
  title: string;
  gltf?: File;
}>;

export const ModelViewTab = Tab(({ active, id, title, gltf }: ModelViewTabProps) => {
  return (
    <ModelViewer active={active} glft={gltf} id={id} title={title} />
  );
});
