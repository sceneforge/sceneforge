import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEventHandler,
  type ForwardedRef,
  type InputHTMLAttributes
} from "react";
import styles from "./BaseHeading.module.css";

export interface BaseHeadingProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value"
> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  editable?: boolean;
  clickToEdit?: boolean;
  text: string;
}

export const BaseHeading = forwardRef((
  {
    autoFocus,
    level = 1,
    clickToEdit,
    editable,
    text,
    className,
    onBlur,
    ...rest
  }: BaseHeadingProps,
  ref: ForwardedRef<HTMLElement>
) => {
  const elementRef = useRef<ForwardedRef<HTMLElement>>(ref);

  const [contentEditable, setContentEditable] = useState(editable);

  useEffect(() => {
    if (elementRef.current instanceof HTMLInputElement && clickToEdit && contentEditable) {
      elementRef.current.focus();
    }
  }, [contentEditable, clickToEdit, elementRef]);

  const handleClick = useCallback(() => {
    setContentEditable(true);
  }, [setContentEditable]);

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
    if (clickToEdit) {
      setContentEditable(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, [clickToEdit, onBlur]);

  const finalClassName = useMemo(() => {
    const classNames = [styles.wrapper];
    if (className) {
      classNames.push(className);
    }
    return classNames.join(" ");
  }, [className]);

  if (contentEditable) {
    return (
      <input
        autoFocus={autoFocus}
        className={finalClassName}
        defaultValue={text}
        ref={elementRef as ForwardedRef<HTMLInputElement>}
        type="text"
        onBlur={handleBlur}
        {...rest}
      />
    );
  }

  return createElement(`h${level}`, {
    className: finalClassName,
    ref: elementRef as ForwardedRef<HTMLHeadingElement>,
    onClick: clickToEdit ? handleClick : undefined,
    "data-editable": clickToEdit ? "true" : "false",
    tabIndex: clickToEdit ? 0 : undefined,
    autoFocus: clickToEdit ? autoFocus : undefined,
  }, text);
});

BaseHeading.displayName = "BaseHeading";
