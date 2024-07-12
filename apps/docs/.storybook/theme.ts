import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  brandImage: "./assets/brand-image-light.svg",
  brandTarget: "_self",
  brandTitle: "Scene Forge Documentation",
  brandUrl: "./",
});

export default theme;
