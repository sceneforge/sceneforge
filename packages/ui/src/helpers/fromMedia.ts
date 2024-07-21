export type FromMediaBreakpoint = "lg" | "md" | "sm" | "xl" | "xxl";

export type FromMediaValue<V = unknown> = Partial<
  Record<FromMediaBreakpoint, V>
>;

export type FromMediaValue2<V1 = unknown, V2 = unknown> = Partial<
  Record<FromMediaBreakpoint, [V1, V2]>
>;

export type FromMediaValueArg<V = unknown> = FromMediaValue<V> | V;

export type FromMediaValue2Arg<V1 = unknown, V2 = unknown> =
  | [V1, V2]
  | FromMediaValue2<V1, V2>;

type PropertyFunction<V = unknown> = (value: V) => unknown;
type PropertyFunctionFromSm<V = unknown> = (
  sm: V, md?: V, lg?: V, xl?: V, xxl?: V
) => unknown;
type PropertyFunctionFromMd<V = unknown> = (
  md: V, lg?: V, xl?: V, xxl?: V
) => unknown;
type PropertyFunctionFromLg<V = unknown> = (lg: V, xl?: V, xxl?: V) => unknown;
type PropertyFunctionFromXl<V = unknown> = (xl: V, xxl?: V) => unknown;

type PropertyFunction2<V1 = unknown, V2 = unknown> = (
  v1: V1,
  v2: V2
) => unknown;

type PropertyFunctionFromSm2<V1 = unknown, V2 = unknown> = (
  sm1: V1,
  sm2: V2,
  md1?: V1,
  md2?: V2,
  lg1?: V1,
  lg2?: V2,
  xl1?: V1,
  xl2?: V2,
  xxl1?: V1,
  xxl2?: V2
) => unknown;

type PropertyFunctionFromMd2<V1 = unknown, V2 = unknown> = (
  md1: V1,
  md2: V2,
  lg1?: V1,
  lg2?: V2,
  xl1?: V1,
  xl2?: V2,
  xxl1?: V1,
  xxl2?: V2
) => unknown;

type PropertyFunctionFromLg2<V1 = unknown, V2 = unknown> = (
  lg1: V1,
  lg2: V2,
  xl1?: V1,
  xl2?: V2,
  xxl1?: V1,
  xxl2?: V2
) => unknown;

type PropertyFunctionFromXl2<V1 = unknown, V2 = unknown> = (
  xl1: V1,
  xl2: V2,
  xxl1?: V1,
  xxl2?: V2
) => unknown;

type FromMediaProperty<
  P extends string = string,
  V1 = unknown, V2 = unknown,
> = { [key in P]: PropertyFunction<V1> | PropertyFunction2<V1, V2> };

type FromMediaPropertySm<
  P extends string = string,
  V1 = unknown,
  V2 = unknown,
> = { [key in `${P}FromSm`]?: PropertyFunctionFromSm<V1> | PropertyFunctionFromSm2<V1, V2> };

type FromMediaPropertyMd<
  P extends string = string,
  V1 = unknown,
  V2 = unknown,
> = { [key in `${P}FromMd`]?: PropertyFunctionFromMd<V1> | PropertyFunctionFromMd2<V1, V2> };

type FromMediaPropertyLg<P extends string = string,
  V1 = unknown,
  V2 = unknown,
> = { [key in `${P}FromLg`]?: PropertyFunctionFromLg<V1> | PropertyFunctionFromLg2<V1, V2> };

type FromMediaPropertyXl<
  P extends string = string,
  V1 = unknown,
  V2 = unknown,
> = { [key in `${P}FromXl`]?: PropertyFunctionFromXl<V1> | PropertyFunctionFromXl2<V1, V2> };

export type FromMediaProperties<
  P extends string = string,
  V1 = unknown,
  V2 = unknown,
> = {
  [key: string]: unknown;
} & (
    FromMediaProperty<P, V1, V2>
    & FromMediaPropertyLg<P, V1, V2>
    & FromMediaPropertyMd<P, V1, V2>
    & FromMediaPropertySm<P, V1, V2>
    & FromMediaPropertyXl<P, V1, V2>
  );

const getValue = <V = unknown>(
  media: FromMediaBreakpoint,
  values: FromMediaValue<V>
) => {
  if (typeof values === "object" && values !== null && media in values && values[media] !== undefined && !Array.isArray(values[media])) {
    return values[media];
  }
  return;
};

const getValues = <V1 = unknown, V2 = unknown>(
  media: FromMediaBreakpoint,
  values: FromMediaValue2<V1, V2>
) => {
  if (typeof values === "object" && values !== null && media in values && values[media] && Array.isArray(values[media]) && values[media].length === 2) {
    return values[media];
  }
  return [undefined, undefined];
};

export const fromMedia = <
  P extends string = string,
  V1 = unknown,
  V2 = unknown,
>(
  styles: FromMediaProperties<P, V1, V2>,
  property: P,
  value: FromMediaValue2Arg<V1, V2> | FromMediaValueArg<V1>
) => {
  if (!Array.isArray(value) && typeof value !== "object") {
    const propertyFunction = styles[property] as PropertyFunction<V1>;
    return propertyFunction(value);
  }
  else if (Array.isArray(value) && value.length > 0 && value.length <= 2) {
    const propertyFunction = styles[property] as PropertyFunction2<V1, V2>;
    return propertyFunction(value[0], value[1]);
  }
  else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const smV = getValue("sm", value as FromMediaValue<V1>);
    const [smV1, smV2] = getValues("sm", value as FromMediaValue2<V1, V2>);
    const mdV = getValue("md", value as FromMediaValue<V1>);
    const [mdV1, mdV2] = getValues("md", value as FromMediaValue2<V1, V2>);
    const lgV = getValue("lg", value as FromMediaValue<V1>);
    const [lgV1, lgV2] = getValues("lg", value as FromMediaValue2<V1, V2>);
    const xlV = getValue("xl", value as FromMediaValue<V1>);
    const [xlV1, xlV2] = getValues("xl", value as FromMediaValue2<V1, V2>);
    const xxlV = getValue("xxl", value as FromMediaValue<V1>);
    const [xxlV1, xxlV2] = getValues("xxl", value as FromMediaValue2<V1, V2>);

    if (smV !== undefined) {
      const fromSm = styles[`${property}FromSm`] as PropertyFunctionFromSm<V1> | undefined;
      if (fromSm) {
        return fromSm(smV, mdV, lgV, xlV, xxlV);
      }
    }
    else if (smV1 !== undefined && smV2 !== undefined) {
      const fromSm = styles[`${property}FromSm`] as PropertyFunctionFromSm2<V1, V2> | undefined;
      if (fromSm) {
        return fromSm(
          smV1,
          smV2,
          mdV1,
          mdV2,
          lgV1,
          lgV2,
          xlV1,
          xlV2,
          xxlV1,
          xxlV2
        );
      }
    }

    if (mdV !== undefined) {
      const fromMd = styles[`${property}FromMd`] as PropertyFunctionFromMd<V1> | undefined;
      if (fromMd) {
        return fromMd(mdV, lgV, xlV, xxlV);
      }
    }
    else if (mdV1 !== undefined && mdV2 !== undefined) {
      const fromMd = styles[`${property}FromMd`] as PropertyFunctionFromMd2<V1, V2> | undefined;
      if (fromMd) {
        return fromMd(
          mdV1,
          mdV2,
          lgV1,
          lgV2,
          xlV1,
          xlV2,
          xxlV1,
          xxlV2
        );
      }
    }

    if (lgV !== undefined) {
      const fromLg = styles[`${property}FromLg`] as PropertyFunctionFromLg<V1> | undefined;
      if (fromLg) {
        return fromLg(lgV, xlV, xxlV);
      }
    }
    else if (lgV1 !== undefined && lgV2 !== undefined) {
      const fromLg = styles[`${property}FromLg`] as PropertyFunctionFromLg2<V1, V2> | undefined;
      if (fromLg) {
        return fromLg(
          lgV1,
          lgV2,
          xlV1,
          xlV2,
          xxlV1,
          xxlV2
        );
      }
    }

    if (xlV !== undefined) {
      const fromXl = styles[`${property}FromXl`] as PropertyFunctionFromXl<V1> | undefined;
      if (fromXl) {
        return fromXl(xlV, xxlV);
      }
    }
    else if (xlV1 !== undefined && xlV2 !== undefined) {
      const fromXl = styles[`${property}FromXl`] as PropertyFunctionFromXl2<V1, V2> | undefined;
      if (fromXl) {
        return fromXl(
          xlV1,
          xlV2,
          xxlV1,
          xxlV2
        );
      }
    }
  }
};

const isFromMediaValue = <T = unknown>(
  value: unknown
): value is FromMediaValue<T> => {
  if (value === null) return false;
  if (typeof value !== "object") return false;
  if (Array.isArray(value)) return false;

  const keys = Object.keys(value);
  if (keys.some(key => !["lg", "md", "sm", "xl", "xxl"].includes(key))) return false;

  return true;
};

export const fromMediaValueArgToValue2Arg = <V1 = unknown, V2 = unknown>(
  v1: FromMediaValueArg<V1>,
  v2: FromMediaValueArg<V2>
): FromMediaValue2Arg<V1, V2> | undefined => {
  let result = {};

  if (isFromMediaValue(v1) && isFromMediaValue(v2)) {
    const breakpoints = [
      ...new Set([...Object.keys(v1), ...Object.keys(v2)]),
    ] as FromMediaBreakpoint[];

    for (const breakpoint of breakpoints) {
      result = {
        ...result,
        [breakpoint]: [getValue(breakpoint, v1), getValue(breakpoint, v2)],
      };
    }
  }
  else if (isFromMediaValue(v1) && !isFromMediaValue(v2)) {
    for (const breakpoint in v1) {
      result = {
        ...result,
        [breakpoint]: [getValue(breakpoint as FromMediaBreakpoint, v1), v2],
      };
    }
  }
  else if (!isFromMediaValue(v1) && isFromMediaValue(v2)) {
    for (const breakpoint in v2) {
      result = {
        ...result,
        [breakpoint]: [v1, getValue(breakpoint as FromMediaBreakpoint, v2)],
      };
    }
  }
  else if (v1 !== undefined && v2 !== undefined) {
    return [v1, v2] as FromMediaValue2Arg<V1, V2>;
  }
  else {
    return;
  }

  return result;
};
