import { PropsWithChildren } from "react";

export type FormListItemProps = PropsWithChildren<{
  label: string;
}>;

const FormListItem = ({ label, children }: FormListItemProps) => {
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
