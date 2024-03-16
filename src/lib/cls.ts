export const cls = (
  ...args: (string | undefined | null | (string | undefined | null)[])[]
) => {
  return args
    .flat()
    .filter(Boolean)
    .filter((x, i, a) => a.indexOf(x) === i)
    .join(" ");
};
