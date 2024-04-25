const colorBackgroundPrefix = ["bg"];
const colorTextPrefix = ["text", "c"];
const schemePrefix = ["dark", "light"];

export const safeList = (colors: string[], opacity: number[]): string[] => {
  const colorBackgroundClasses = [
    colors.map((c) => colorBackgroundPrefix.map((cbp) => `${cbp}-${c}`)).flat(),
    colors
      .map((c) =>
        schemePrefix
          .map((sp) =>
            colorBackgroundPrefix.map((cbp) => `${sp}:${cbp}-${c}`).flat(),
          )
          .flat(),
      )
      .flat(),
  ].flat();
  const colorTextClasses = [
    colors.map((c) => colorTextPrefix.map((ctp) => `${ctp}-${c}`)).flat(),
    colors
      .map((c) =>
        schemePrefix
          .map((sp) => colorTextPrefix.map((ctp) => `${sp}:${ctp}-${c}`))
          .flat(),
      )
      .flat(),
  ].flat();
  return [
    ...colorBackgroundClasses,
    ...colorTextClasses,
    ...colorBackgroundClasses
      .map((c) => opacity.map((o) => `${c}:${o}`))
      .flat(),
  ];
};
