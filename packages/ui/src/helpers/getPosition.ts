import { Orientation, Position } from "../types";

export const getPosition = (orientation: Orientation, position: Position) => {
  if (orientation === Orientation.Vertical) {
    return position === Position.Start ? "inlineStart" : "inlineEnd";
  }
  else {
    return position === Position.Start ? "blockStart" : "blockEnd";
  }
};

export const isBlockStart = (orientation: Orientation, position: Position) => {
  return getPosition(orientation, position) === "blockStart";
};

export const isBlockEnd = (orientation: Orientation, position: Position) => {
  return getPosition(orientation, position) === "blockEnd";
};

export const isInlineStart = (orientation: Orientation, position: Position) => {
  return getPosition(orientation, position) === "inlineStart";
};

export const isInlineEnd = (orientation: Orientation, position: Position) => {
  return getPosition(orientation, position) === "inlineEnd";
};
