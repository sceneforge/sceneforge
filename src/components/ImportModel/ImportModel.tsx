import { ModelViewer } from "../ModelViewer/ModelViewer";

export interface ImportModelProps {
  file: File;
}

export const ImportModel = ({ file }: ImportModelProps) => {

  return (
    <ModelViewer glft={file} />
  )
}