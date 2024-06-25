import { Container, Fieldset, FieldsetProps, Section } from "@sceneforge/ui";
import { useId } from "react";

export type FormViewTemplateProps = {
  fieldsets?: FieldsetProps[];
  id?: string;
  title: string;
};

const FormViewTemplate = ({ fieldsets, id, title }: FormViewTemplateProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <Container>
      <Section level={1} title={title}>
        <form id={currentId}>
          {fieldsets && fieldsets.map((fieldset, index) => (
            <Fieldset
              id={`${currentId}-fieldset-${index}`}
              key={`${currentId}-fieldset-${index}`}
              {...fieldset}
            />
          ))}
        </form>
      </Section>
    </Container>
  );
};

export default FormViewTemplate;
