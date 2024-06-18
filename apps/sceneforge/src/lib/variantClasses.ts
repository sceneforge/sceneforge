import { type Variant } from "../types/variants";

// @unocss-include
export const variantBgClass: Record<Variant, null | string> = {
  accent: "bg-accent",
  danger: "bg-danger",
  default: "bg-primary",
  info: "bg-info",
  none: null,
  success: "bg-success",
  warning: "bg-warning",
};

// @unocss-include
export const variantTextClass: Record<Variant, null | string> = {
  accent: "c-accent",
  danger: "c-danger",
  default: "c-primary",
  info: "c-info",
  none: null,
  success: "c-success",
  warning: "c-warning",
};
