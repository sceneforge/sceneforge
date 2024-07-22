import { gridStyleHelper } from "../../grid.stylex";
import { type FromMediaValue, breakpointValue, fromMediaValueArgToValue2Arg } from "../../helpers";
import { View, type ViewProps } from "../View";

export type GridProps = {
  columns?: FromMediaValue<number> | number;
  columnsLg?: number;
  columnsMd?: number;
  columnsSize?: FromMediaValue<number> | number;
  columnsSizeLg?: number;
  columnsSizeMd?: number;
  columnsSizeSm?: number;
  columnsSizeXl?: number;
  columnsSizeXxl?: number;
  columnsSm?: number;
  columnsTrack?: FromMediaValue<string> | string;
  columnsTrackLg?: string;
  columnsTrackMd?: string;
  columnsTrackSm?: string;
  columnsTrackXl?: string;
  columnsTrackXxl?: string;
  columnsXl?: number;
  columnsXxl?: number;
  columsnTrackMd?: string;
  gap?: FromMediaValue<number> | number;
  gapLg?: number;
  gapMd?: number;
  gapSm?: number;
  gapXl?: number;
  gapXxl?: number;
  rows?: FromMediaValue<number> | number;
  rowsLg?: number;
  rowsMd?: number;
  rowsSize?: FromMediaValue<number> | number;
  rowsSizeLg?: number;
  rowsSizeMd?: number;
  rowsSizeSm?: number;
  rowsSizeXl?: number;
  rowsSizeXxl?: number;
  rowsSm?: number;
  rowsTrack?: FromMediaValue<string> | string;
  rowsTrackLg?: string;
  rowsTrackMd?: string;
  rowsTrackSm?: string;
  rowsTrackXl?: string;
  rowsTrackXxl?: string;
  rowsXl?: number;
  rowsXxl?: number;
} & ViewProps;

const Grid = ({
  columns,
  columnsLg,
  columnsMd,
  columnsSize,
  columnsSizeLg,
  columnsSizeMd,
  columnsSizeSm,
  columnsSizeXl,
  columnsSizeXxl,
  columnsSm,
  columnsTrack = "1fr",
  columnsTrackLg,
  columnsTrackMd,
  columnsTrackSm,
  columnsTrackXl,
  columnsTrackXxl,
  columnsXl,
  columnsXxl,
  gap,
  gapLg,
  gapMd,
  gapSm,
  gapXl,
  gapXxl,
  rows,
  rowsLg,
  rowsMd,
  rowsSize,
  rowsSizeLg,
  rowsSizeMd,
  rowsSizeSm,
  rowsSizeXl,
  rowsSizeXxl,
  rowsSm,
  rowsTrack = "1fr",
  rowsTrackLg,
  rowsTrackMd,
  rowsTrackSm,
  rowsTrackXl,
  rowsTrackXxl,
  rowsXl,
  rowsXxl,
  style,
  ...props
}: GridProps) => {
  const currentColumns = breakpointValue(
    columns,
    columnsSm,
    columnsMd,
    columnsLg,
    columnsXl,
    columnsXxl
  );
  const currentRows = breakpointValue(
    rows,
    rowsSm,
    rowsMd,
    rowsLg,
    rowsXl,
    rowsXxl
  );
  const currentColumnsTrack = breakpointValue(
    columnsTrack,
    columnsTrackSm,
    columnsTrackMd,
    columnsTrackLg,
    columnsTrackXl,
    columnsTrackXxl
  );
  const currentRowsTrack = breakpointValue(
    rowsTrack,
    rowsTrackSm,
    rowsTrackMd,
    rowsTrackLg,
    rowsTrackXl,
    rowsTrackXxl
  );
  const currentColumnsSize = breakpointValue(
    columnsSize,
    columnsSizeSm,
    columnsSizeMd,
    columnsSizeLg,
    columnsSizeXl,
    columnsSizeXxl
  );
  const currentRowsSize = breakpointValue(
    rowsSize,
    rowsSizeSm,
    rowsSizeMd,
    rowsSizeLg,
    rowsSizeXl,
    rowsSizeXxl
  );

  const gridCols = currentColumns
    ? fromMediaValueArgToValue2Arg(
      currentColumns,
      currentColumnsTrack
    )
    : undefined;

  const gridRows = currentRows
    ? fromMediaValueArgToValue2Arg(
      currentRows,
      currentRowsTrack
    )
    : undefined;

  const autoCols = !currentColumns && currentColumnsSize
    ? currentColumnsSize
    : undefined;

  const autoRows = !currentRows && currentRowsSize
    ? currentRowsSize
    : undefined;

  return (
    <View
      style={[
        gridStyleHelper({
          autoCols,
          autoRows,
          cols: gridCols,
          gap: breakpointValue(gap, gapSm, gapMd, gapLg, gapXl, gapXxl),
          rows: gridRows,
        }),
        style,
      ]}
      {...props}
    />
  );
};

export default Grid;
