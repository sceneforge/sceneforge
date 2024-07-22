import { Blockquote, FigureButtonDialog, Grid, Heading, Image, Link, Section } from "@sceneforge/ui";
import { type MarkdownProps } from "@simplecomponent/markdown";

import { wrapper } from "./wrapper";

export const markdownComponents: MarkdownProps["components"] = {
  FigureButtonDialog: wrapper(FigureButtonDialog),
  Grid: wrapper(Grid),
  Section: wrapper(Section),
  a: wrapper(Link, { rel: "nofollow", target: "_blank" }),
  blockquote: wrapper(Blockquote),
  h1: wrapper(Heading, { level: 1 }),
  h2: wrapper(Heading, { level: 2 }),
  h3: wrapper(Heading, { level: 3 }),
  h4: wrapper(Heading, { level: 4 }),
  h5: wrapper(Heading, { level: 5 }),
  h6: wrapper(Heading, { level: 6 }),
  img: wrapper(Image),
};
