import {
  AbstractMesh,
  ArcRotateCamera,
  Camera,
  HemisphericLight,
  Light,
  Mesh,
  TransformNode,
} from "@babylonjs/core";

export enum SceneObjectType {
  AbstractMesh = "AbstractMesh",
  ArcRotateCamera = "ArcRotateCamera",
  Camera = "Camera",
  HemisphericLight = "HemisphericLight",
  Light = "Light",
  Mesh = "Mesh",
  TransformNode = "TransformNode",
  Unknown = "Unknown",
}

export const typeOf = (node: unknown): SceneObjectType => {
  if (node instanceof Mesh) {
    return SceneObjectType.Mesh;
  }
  else if (node instanceof AbstractMesh) {
    return SceneObjectType.AbstractMesh;
  }
  else if (node instanceof HemisphericLight) {
    return SceneObjectType.HemisphericLight;
  }
  else if (node instanceof Light) {
    return SceneObjectType.Light;
  }
  else if (node instanceof ArcRotateCamera) {
    return SceneObjectType.ArcRotateCamera;
  }
  else if (node instanceof Camera) {
    return SceneObjectType.Camera;
  }
  else if (node instanceof TransformNode) {
    return SceneObjectType.TransformNode;
  }
  return SceneObjectType.Unknown;
};
