export const cls = (
  ...args: (string | undefined | null | (string | undefined | null)[])[]
) => {
  return args
    .flat()
    .filter(Boolean)
    .filter((x, index, a) => a.indexOf(x) === index)
    .join(" ");
};
