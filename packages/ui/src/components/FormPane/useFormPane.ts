import { type Ref, useImperativeHandle, useRef } from "react";

import { useCurrentId } from "../../hooks";

export interface FormPaneRef {
  focus(): void;
  get form(): HTMLFormElement | null;
  get pane(): HTMLDivElement | null;
  reset(): void;
  submit(): void;
}

export type UseFormPaneProps = {
  id?: string;
  ref?: Ref<FormPaneRef>;
};

export const useFormPane = ({
  id,
  ref,
}: UseFormPaneProps) => {
  const currentId = useCurrentId(id);

  const formRef = useRef<HTMLFormElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => new (class implements FormPaneRef {
    focus() {
      formRef.current?.focus();
    }

    reset() {
      formRef.current?.reset();
    }

    submit() {
      formRef.current?.submit();
    }

    get form() {
      return formRef.current;
    }

    get pane() {
      return paneRef.current;
    }
  })(), [formRef, paneRef]);

  return {
    currentId,
    formRef,
    paneRef,
  };
};
