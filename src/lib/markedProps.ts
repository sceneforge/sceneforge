import { v4 as uuid } from "uuid";

export const markedProps = (scope: string) => {
  const id = `${scope}-${uuid()}`;

  return {
    key: id,
    id,
  };
};
