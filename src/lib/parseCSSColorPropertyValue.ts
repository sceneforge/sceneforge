const colorFuncSRGB =
  /^color\(srgb\s(?<red>[0-9.]+)\s(?<green>[0-9.]+)\s(?<blue>[0-9.]+)\)$/;

const hex =
  /^#((?<red6>[0-9a-fA-F]{2})(?<green6>[0-9a-fA-F]{2})(?<blue6>[0-9a-fA-F]{2})|(?<red3>[0-9a-fA-F]{1})(?<green3>[0-9a-fA-F]{1})(?<blue3>[0-9a-fA-F]{1}))$/i;

const rgbFunc =
  /^rgb\(\s*(?<red>[0-9.]+%?)\s*(,|\s)\s*(?<green>[0-9.]+%?)\s*(,|\s)\s*(?<blue>[0-9.]+%?)\s*\)$/;

const rgbaFunc =
  /^rgba\(\s*(?<red>[0-9.]+%?)\s*(,|\s)\s*(?<green>[0-9.]+%?)\s*(,|\s)\s*(?<blue>[0-9.]+%?)\s*(,|\s)\s*(?<alpha>[0-9.]+%?)\s*\)$/;

export interface ColorRGBA {
  r: number;
  g: number;
  b: number;
  a?: number;
}

const parseNumber = (
  value?: string | null,
  factor?: number | null,
  factorForPercentage?: boolean | null,
  round?: boolean | null,
  baseNumber?: number | null
): number | undefined => {
  if (!value || value.trim() === "") {
    return undefined;
  }

  let result: number;
  if (baseNumber !== null && typeof baseNumber === "number" && baseNumber > 0) {
    result = parseInt(value, baseNumber);
  } else {
    result = parseFloat(value);
  }

  if (isNaN(result)) {
    return undefined;
  }

  if (factor !== null && typeof factor === "number") {
    if (factorForPercentage) {
      if (value.includes("%")) {
        result *= factor;
      }
    } else {
      result *= factor;
    }
  }

  if (round) {
    result = Math.round(result);
  }

  return result;
};

interface BuildColorRGBAProps {
  red?: { value?: string; factor?: number };
  green?: { value?: string; factor?: number };
  blue?: { value?: string; factor?: number };
  alpha?: { value?: string; factor?: number };
  defaultFactor?: number | null;
  factorForPercentage?: boolean | null;
  alphaFactorForPercentage?: boolean | null;
  round?: boolean | null;
  base?: number | null;
}

const buildColorRGBA = ({
  red: { value: red, factor: redFactor } = {},
  green: { value: green, factor: greenFactor } = {},
  blue: { value: blue, factor: blueFactor } = {},
  alpha: { value: alpha, factor: alphaFactor } = {},
  defaultFactor,
  factorForPercentage,
  alphaFactorForPercentage,
  round,
  base,
}: BuildColorRGBAProps): ColorRGBA | undefined => {
  const r = parseNumber(
    red,
    redFactor ?? defaultFactor,
    factorForPercentage,
    round,
    base
  );
  const g = parseNumber(
    green,
    blueFactor ?? defaultFactor,
    factorForPercentage,
    round,
    base
  );
  const b = parseNumber(
    blue,
    greenFactor ?? defaultFactor,
    factorForPercentage,
    round,
    base
  );
  if (typeof r === "number" && typeof g === "number" && typeof b === "number") {
    if (alpha) {
      const a = parseNumber(
        alpha,
        alphaFactor ?? defaultFactor,
        alphaFactorForPercentage,
        round,
        base
      );
      if (typeof a === "number") {
        return { r, g, b, a };
      }
    }
    return { r, g, b };
  }
};

interface Group {
  key: string;
  names?: (Omit<Group, "names"> | string)[];
  factor?: number;
}

interface ParseRule {
  regExp: RegExp;
  defaultFactor?: number;
  factorForPercentage?: boolean;
  alphaFactorForPercentage?: boolean;
  round?: boolean;
  base?: number;
  groups?: (Group | string)[];
}

const parseRules = (
  rules: ParseRule[]
): ((color?: CSSStyleValue) => ColorRGBA | undefined) => {
  const parsedRules = rules.map(parseRule);

  return (color?: CSSStyleValue) => {
    if (color) {
      for (const parsedRule of parsedRules) {
        const result = parsedRule(color);
        if (result) {
          return result;
        }
      }
    }

    return undefined;
  };
};

const parseRule = ({
  regExp,
  defaultFactor,
  factorForPercentage,
  alphaFactorForPercentage,
  round,
  base,
  groups,
}: ParseRule): ((color?: CSSStyleValue) => ColorRGBA | undefined) => {
  return (color?: CSSStyleValue) => {
    if (color) {
      const group = collect(regExp, color.toString());
      return buildColorRGBA(
        (groups ?? [])
          .map((name) => collectGroup(name, group))
          .reduce(
            (acc, [key, value, { factor }]) => {
              if (key) {
                return {
                  ...acc,
                  [key]: {
                    value,
                    factor: factor,
                  },
                };
              }
              return acc;
            },
            {
              defaultFactor,
              factorForPercentage,
              alphaFactorForPercentage,
              round,
              base,
            }
          )
      );
    }
  };
};

const collectGroup = (
  groupName: Group | string,
  group: Record<string, unknown>
):
  | [string, unknown, { factor?: number }]
  | [undefined, undefined, { factor?: number }] => {
  if (typeof groupName === "string") {
    if (groupName in group && typeof group[groupName] !== "undefined") {
      return [groupName, group[groupName], {}];
    }
  } else if (typeof groupName === "object" && !Array.isArray(groupName)) {
    const { key, names, factor } = groupName;
    if (names && Array.isArray(names)) {
      for (const name of names) {
        if (typeof name === "string") {
          if (name in group && group[name] !== undefined) {
            return [key, group[name], { factor }];
          }
        } else if (typeof name === "object") {
          const { key: itemKey, factor: itemFactor } = name;
          if (itemKey in group && group[itemKey] !== undefined) {
            return [key, group[itemKey], { factor: itemFactor ?? factor }];
          }
        }
      }
    } else {
      if (key in group && group[key] !== undefined) {
        return [key, group[key], { factor }];
      }
    }
  }
  return [undefined, undefined, {}];
};

const collect = (regExp: RegExp, source: string) => {
  const colorExec = regExp.exec(source);
  if (colorExec) {
    return { ...colorExec.groups };
  }
  return {};
};

export const parseCSSColorPropertyValue = parseRules([
  {
    regExp: colorFuncSRGB,
    defaultFactor: 2.55,
    factorForPercentage: false,
    round: true,
    groups: ["red", "green", "blue"],
  },
  {
    regExp: hex,
    factorForPercentage: false,
    round: true,
    base: 16,
    defaultFactor: 1,
    groups: [
      {
        key: "red",
        names: ["red6", { key: "red3", factor: 17 }],
      },
      {
        key: "green",
        names: ["green6", { key: "green3", factor: 17 }],
      },
      {
        key: "blue",
        names: ["blue6", { key: "blue3", factor: 17 }],
      },
    ],
  },
  {
    regExp: rgbFunc,
    groups: ["red", "green", "blue"],
    factorForPercentage: true,
    defaultFactor: 2.55,
    round: true,
  },
  {
    regExp: rgbaFunc,
    groups: ["red", "green", "blue", { key: "alpha", factor: 0.01 }],
    factorForPercentage: true,
    alphaFactorForPercentage: true,
    defaultFactor: 2.55,
    round: true,
  },
]);
