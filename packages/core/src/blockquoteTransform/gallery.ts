import type { Element } from "hast";

import { Variant } from "@sceneforge/ui";

import type { BlockquoteFunction } from "./customBlockquote";
import type { BlockquoteElement } from "./isCustomBlockquote";

export type GalleryParameters = {
  columns?: number;
  columnsLg?: number;
  columnsSm?: number;
  columnsXl?: number;
  columnsXxl?: number;
  columsnMd?: number;
  gap?: number;
  gapLg?: number;
  gapMd?: number;
  gapSm?: number;
  gapXl?: number;
  gapXxl?: number;
  variant?: Variant;
};

const getHeadingProps = (node: BlockquoteElement) => {
  let title = "";
  let level = 2;

  for (const child of node.children) {
    if (
      child.type === "element"
      && /^h[1-6]$/.test(child.tagName)
      && child.children.length === 1
      && child.children[0].type === "text"
    ) {
      title = child.children[0].value;
      level = Number.parseInt(child.tagName[1], 10);
    }
  }

  return {
    level,
    title,
  };
};

const getGridImages = (node: Element, parameters?: GalleryParameters) => {
  const figures: Element[] = [];
  for (const child of node.children) {
    if (
      child.type === "element"
      && child.tagName === "li"
      && child.children.length === 1
      && child.children[0].type === "element"
      && child.children[0].tagName === "img"
    ) {
      figures.push({
        children: [],
        position: child.children[0].position,
        properties: {
          ...child.children[0].properties,
          variant: parameters?.variant ?? Variant.Primary,
        },
        tagName: "FigureButtonDialog",
        type: "element",
      });
    }
  }

  return figures;
};

const getGrids = (node: BlockquoteElement, parameters?: GalleryParameters) => {
  const grids: Element[] = [];

  for (const child of node.children) {
    if (child.type === "element" && child.tagName === "ul") {
      grids.push({
        children: getGridImages(child, parameters),
        position: child.position,
        properties: {
          columns: parameters?.columns ?? undefined,
          columnsLg: parameters?.columnsLg ?? 3,
          columnsMd: parameters?.columsnMd ?? 2,
          columnsSm: parameters?.columnsSm ?? undefined,
          columnsXl: parameters?.columnsXl ?? 4,
          columnsXxl: parameters?.columnsXxl ?? 5,
          gap: parameters?.gap ?? 2,
          gapLg: parameters?.gapLg ?? undefined,
          gapMd: parameters?.gapMd ?? undefined,
          gapSm: parameters?.gapSm ?? undefined,
          gapXl: parameters?.gapXl ?? undefined,
          gapXxl: parameters?.gapXxl ?? undefined,
        },
        tagName: "Grid",
        type: "element",
      });
    }
  }

  return grids;
};

export const gallery: BlockquoteFunction<GalleryParameters> = (
  node,
  parameters
): Element => {
  const { level, title } = getHeadingProps(node);

  return {
    ...node,
    children: getGrids(node, parameters),
    properties: {
      level,
      title,
    },
    tagName: "Section",
    type: "element",
  };
};
