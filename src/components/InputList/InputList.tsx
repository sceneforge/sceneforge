import { type PropsWithChildren } from "react";

export type InputListProps = PropsWithChildren;

export const InputList = ({ children }: InputListProps) => {
  return (
    <form>
      <ul className="m-0 list-none p-b-8 p-t-0 p-inline-0">{children}</ul>
    </form>
  );
};
