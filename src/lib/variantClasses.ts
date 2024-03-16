import { type Variant } from "../types/variants";

// @unocss-include
export const variantBgClass: Record<Variant, string | null> = {
  none: null,
  default: "bg-primary",
  accent: "bg-accent",
  danger: "bg-danger",
  warning: "bg-warning",
  success: "bg-success",
  info: "bg-info",
};

// @unocss-include
export const variantTextClass: Record<Variant, string | null> = {
  none: null,
  default: "c-primary",
  accent: "c-accent",
  danger: "c-danger",
  warning: "c-warning",
  success: "c-success",
  info: "c-info",
};
