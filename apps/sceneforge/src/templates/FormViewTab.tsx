import {
  Container,
  type FieldsetProps,
  Form,
  Section,
  type TabComponentProps,
  type Variant,
} from "@sceneforge/ui";
import { useId } from "react";

export type FormViewTabProps = TabComponentProps<{
  columns?: number;
  fieldsets?: FieldsetProps[];
  gap?: number;
  title?: string;
  variant?: Variant;
}>;

const FormViewTab = ({
  columns,
  fieldsets,
  gap,
  tabId,
  title,
  variant,
}: FormViewTabProps) => {
  const generatedId = useId();
  const currentId = tabId ?? generatedId;

  return (
    <Container padding={{ block: 1 }}>
      <Section level={1} shadow title={title}>
        <Form
          columns={columns}
          fieldsets={fieldsets}
          gap={gap}
          id={`${currentId}-form`}
          variant={variant}
        />
      </Section>
    </Container>
  );
};

export default FormViewTab;
