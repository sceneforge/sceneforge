export const getShiftedIndex = (
  array: unknown[],
  currentIndex: number
): number[] => {
  let countDown = 0;
  return array.map((_, index) => {
    return index > currentIndex
      ? countDown++
      : (index < currentIndex
        ? array.length - 1 - currentIndex + index
        : array.length - 1);
  });
};
