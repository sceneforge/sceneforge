import { lazy } from "react";

import { useCurrentId } from "../../hooks";
import { Slider, type SliderProps } from "../Slider";

const Field = lazy(() => import("./Field"));

export type FieldSliderProps = {
  label: string;
} & SliderProps;

const FieldSlider = ({ id, label, ...props }: FieldSliderProps) => {
  const currentId = useCurrentId(id);

  return (
    <Field id={currentId} label={label}>
      <Slider {...props} id={currentId} />
    </Field>
  );
};

export default FieldSlider;
