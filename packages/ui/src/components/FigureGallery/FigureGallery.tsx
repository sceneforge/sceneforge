import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { FigureButtonDialog, type FigureButtonDialogProps } from "../FigureButtonDialog";
import { Grid, type GridProps } from "../Grid";
import { Section, type SectionProps } from "../Section";

export type FigureGalleryProps = {
  columns?: GridProps["columns"];
  columnsSize?: GridProps["columnsSize"];
  columnsTrack?: GridProps["columnsTrack"];
  figures?: Omit<FigureButtonDialogProps, "id">[];
  gap?: GridProps["gap"];
  id?: string;
  level?: SectionProps["level"];
  rows?: GridProps["rows"];
  rowsSize?: GridProps["rowsSize"];
  rowsTrack?: GridProps["rowsTrack"];
  scale?: FigureButtonDialogProps["scale"];
  shape?: FigureButtonDialogProps["shape"];
  title?: SectionProps["title"];
};

const styles = stylex.create({
  container: {
    isolation: "isolate",
    overflowX: null,
    overflowY: null,
  },
  figureButton: {
    zIndex: {
      ":hover": 1,
      "default": -1,
    },
  },
});

const FigureGallery = ({
  columns = { lg: 3, md: 2, xl: 4, xxl: 5 },
  columnsSize,
  columnsTrack,
  figures,
  gap = 3,
  id,
  level,
  rows,
  rowsSize,
  rowsTrack,
  scale,
  shape,
  title,
}: FigureGalleryProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <Section
      id={currentId}
      level={level}
      title={title}
    >
      <Grid
        columns={columns}
        columnsSize={columnsSize}
        columnsTrack={columnsTrack}
        gap={gap}
        id={`${currentId}-grid`}
        padding={0.75}
        rows={rows}
        rowsSize={rowsSize}
        rowsTrack={rowsTrack}
        style={styles.container}
      >
        {figures && figures.map((figure, index) => (
          <FigureButtonDialog
            key={`${currentId}-grid-figure-${index}`}
            scale={scale}
            shape={shape}
            {...figure}
            id={`${currentId}-grid-figure-${index}`}
            style={styles.figureButton}
          />
        ))}
      </Grid>
    </Section>
  );
};

export default FigureGallery;
