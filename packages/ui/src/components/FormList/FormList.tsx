import type { FormHTMLAttributes } from "react";

export type FormListProps = FormHTMLAttributes<HTMLFormElement>;

const FormList = ({ children, ...props }: FormListProps) => {
  return (
    <form {...props}>
      <ul>
        {children}
      </ul>
    </form>
  );
};

export default FormList;
