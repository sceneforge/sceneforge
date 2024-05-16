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
    return undefined;
  }
  const possibleNumber = parseFloat(decodedValue);
  if (!isNaN(possibleNumber)) {
    return possibleNumber;
  }
  return decodedValue;
};

export const parseParams = (urlHash?: string) => {
  if (!urlHash) {
    return {};
  }

  const params = urlHash.replace(/^#!/g, "");
  return params
    .split("&")
    .map((p) => {
      const [key, value] = p.split("=");
      return { key, value };
    })
    .reduce((acc, { key, value }) => {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeValue(value);
      const keyValue =
        decodedKey in acc
          ? Array.isArray((acc as Record<string, unknown>)[decodedKey])
            ? [...(acc as Record<string, unknown[]>)[decodedKey], decodedValue]
            : [(acc as Record<string, unknown>)[decodedKey], decodedValue]
          : decodedValue;
      return {
        ...acc,
        [decodedKey]: keyValue,
      };
    }, {});
};
