import { type ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export type AdditionalData = {
  hit?: boolean;
  pickedPoint?: Vector3;
  faceId?: number;
};

export const getActionEventAdditionalData = (
  ev: ActionEvent,
): AdditionalData => {
  if (
    "additionalData" in ev &&
    typeof ev.additionalData === "object" &&
    ev.additionalData !== null
  ) {
    return ev.additionalData as AdditionalData;
  }
  return {};
};
