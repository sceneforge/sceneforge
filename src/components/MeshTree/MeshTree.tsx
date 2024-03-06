import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { ForwardedRef, forwardRef } from "react";
import { meshTree } from "../../lib/meshTree";
import { TreeView } from "../TreeView";
import { MeshNode, type MeshNodeProps } from "./MeshNode";

export type MeshTreeProps = {
  meshes?: AbstractMesh[];
  onClick?: MeshNodeProps["onClick"];
};

export const MeshTree = forwardRef(function MeshTree(
  { meshes, onClick }: MeshTreeProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const summaryComponent = ({ id, label, reference }: MeshNodeProps) => {
    return (<MeshNode
      summary
      id={id}
      label={label}
      reference={reference}
      onClick={onClick}
    />);
  };

  const itemComponent = ({ id, label, reference }: MeshNodeProps) => {
    return (<MeshNode id={id} label={label} reference={reference} onClick={onClick} />);
  }

  return (
    <div ref={ref}>
      <TreeView
        data={meshTree(meshes)}
        summaryComponent={summaryComponent}
        itemComponent={itemComponent}
      />
    </div>
  );
});
