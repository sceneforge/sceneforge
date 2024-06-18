import { PropsWithChildren } from "react";

export type SafeAreaProps = PropsWithChildren<{
  horizonal?: boolean;
  vertical?: boolean;
}>;

export const SafeArea = ({ children }: SafeAreaProps) => {
  return (
    <div>
      {children}
    </div>
  );
};
