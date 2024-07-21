import { gridStyleHelper } from "../../grid.stylex";
import { type FromMediaBreakpoint, fromMediaValueArgToValue2Arg } from "../../helpers";
import { View, type ViewProps } from "../View";

type NumberBreakpoint = Partial<Record<FromMediaBreakpoint, number>> | number;
type StringBreakpoint = Partial<Record<FromMediaBreakpoint, string>> | string;

export type GridProps = {
  columns?: NumberBreakpoint;
  columnsSize?: NumberBreakpoint;
  columnsTrack?: StringBreakpoint;
  gap?: NumberBreakpoint;
  rows?: NumberBreakpoint;
  rowsSize?: NumberBreakpoint;
  rowsTrack?: StringBreakpoint;
} & ViewProps;

const Grid = ({
  columns,
  columnsSize,
  columnsTrack = "1fr",
  gap,
  rows,
  rowsSize,
  rowsTrack = "1fr",
  style,
  ...props
}: GridProps) => {
  const gridCols = columns
    ? fromMediaValueArgToValue2Arg(columns, columnsTrack)
    : undefined;
  const gridRows = rows
    ? fromMediaValueArgToValue2Arg(rows, rowsTrack)
    : undefined;

  return (
    <View
      style={[
        gridStyleHelper({
          autoCols: !columns && columnsSize ? columnsSize : undefined,
          autoRows: !rows && rowsSize ? rowsSize : undefined,
          cols: gridCols,
          gap,
          rows: gridRows,
        }),
        style,
      ]}
      {...props}
    />
  );
};

export default Grid;
