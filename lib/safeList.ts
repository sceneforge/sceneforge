const colorBackgroundPrefix = ["bg"];
const colorTextPrefix = ["text", "c"];
const schemePrefix = ["dark", "light"];

export const safeList = (colors: string[], opacity: number[]): string[] => {
  const colorBackgroundClasses = [
    colors.flatMap(c => colorBackgroundPrefix.map(cbp => `${cbp}-${c}`)),
    colors
      .flatMap(c =>
        schemePrefix
          .flatMap(sp =>
            colorBackgroundPrefix.flatMap(cbp => `${sp}:${cbp}-${c}`))),
  ].flat();
  const colorTextClasses = [
    colors.flatMap(c => colorTextPrefix.map(ctp => `${ctp}-${c}`)),
    colors
      .flatMap(c =>
        schemePrefix
          .flatMap(sp => colorTextPrefix.map(ctp => `${sp}:${ctp}-${c}`))),
  ].flat();
  return [
    ...colorBackgroundClasses,
    ...colorTextClasses,
    ...colorBackgroundClasses
      .flatMap(c => opacity.map(o => `${c}:${o}`)),
  ];
};
