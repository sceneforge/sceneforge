import { PropsWithChildren } from "react";

export type FormListItemProps = PropsWithChildren<{
  label: string;
}>;

const FormListItem = ({ children, label }: FormListItemProps) => {
  return (
    <li>
      <label>{label}</label>
      <div>
        {children}
      </div>
    </li>
  );
};

export default FormListItem;
