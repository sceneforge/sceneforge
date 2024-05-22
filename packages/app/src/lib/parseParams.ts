const decodeValue = (value: string) => {
  const decodedValue = decodeURIComponent(value);
  if (decodedValue === "true") {
    return true;
  }
  if (decodedValue === "false") {
    return false;
  }
  if (decodedValue === "null") {
    return null;
  }
  if (decodedValue === "undefined") {
    return;
  }
  const possibleNumber = Number.parseFloat(decodedValue);
  if (!Number.isNaN(possibleNumber)) {
    return possibleNumber;
  }
  return decodedValue;
};

export const parseParams = (urlHash?: string) => {
  if (!urlHash) {
    return {};
  }

  const params = urlHash.replaceAll(/^#!/g, "");
  return params
    .split("&")
    .map((p) => {
      const [key, value] = p.split("=");
      return { key, value };
    })
    .reduce((accumulator, { key, value }) => {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeValue(value);
      const keyValue
        = decodedKey in accumulator
          ? (Array.isArray((accumulator as Record<string, unknown>)[decodedKey])
            ? [
              ...(accumulator as Record<string, unknown[]>)[decodedKey],
              decodedValue,
            ]
            : [
              (accumulator as Record<string, unknown>)[decodedKey],
              decodedValue,
            ])
          : decodedValue;
      return {
        ...accumulator,
        [decodedKey]: keyValue,
      };
    }, {});
};
