export const getShiftedIndex = (
  arr: unknown[],
  currentIndex: number,
): number[] => {
  let countDown = 0;
  return arr.map((_, index) => {
    return index > currentIndex
      ? countDown++
      : index < currentIndex
        ? arr.length - 1 - currentIndex + index
        : arr.length - 1;
  });
};
