import { type PropsWithChildren } from "react";

export type InputListProps = PropsWithChildren;

export const InputList = ({ children }: InputListProps) => {
  return (
    <form>
      <ul className="list-none p-t-0 p-inline-0 p-b-8 m-0">{children}</ul>
    </form>
  );
};
