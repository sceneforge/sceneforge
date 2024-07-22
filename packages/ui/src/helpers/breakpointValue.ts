import type { FromMediaValue } from "./fromMedia";

export const breakpointValue = <V = unknown>(
  value?: FromMediaValue<V> | V,
  sm?: V,
  md?: V,
  lg?: V,
  xl?: V,
  xxl?: V
): FromMediaValue<V> | V | undefined => {
  if (value !== undefined) {
    return value;
  }

  if (
    sm === undefined
    && md === undefined
    && lg === undefined
    && xl === undefined
    && xxl === undefined
  ) {
    return;
  }

  return {
    ...(sm === undefined ? {} : { sm }),
    ...(md === undefined ? {} : { md }),
    ...(lg === undefined ? {} : { lg }),
    ...(xl === undefined ? {} : { xl }),
    ...(xxl === undefined ? {} : { xxl }),
  };
};
