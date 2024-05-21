export const cls = (
  ...args: ((null | string | undefined)[] | null | string | undefined)[]
) => {
  return args
    .flat()
    .filter(Boolean)
    .filter((x, index, a) => a.indexOf(x) === index)
    .join(" ");
};
