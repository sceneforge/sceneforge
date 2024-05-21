import { type ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export type AdditionalData = {
  hit?: boolean;
  pickedPoint?: Vector3;
  faceId?: number;
};

export const getActionEventAdditionalData = (
  event: ActionEvent
): AdditionalData => {
  if (
    "additionalData" in event
    && typeof event.additionalData === "object"
    && event.additionalData !== null
  ) {
    return event.additionalData as AdditionalData;
  }
  return {};
};
