import { useCallback, useEffect, useRef, useState } from "react";

import type { PaneProps } from "./Pane";

export type UsePaneProps = {
  onTitleChange?: PaneProps["onTitleChange"];
  title?: string;
};

export const usePane = ({
  onTitleChange,
  title,
}: UsePaneProps) => {
  const [currentTitleEditing, setCurrentTitleEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = useCallback(() => {
    if (inputRef.current) {
      const previousTitle = currentTitle;
      const newTitle = inputRef.current.value;
      if (newTitle !== previousTitle) {
        setCurrentTitle(newTitle);
        if (onTitleChange) {
          onTitleChange(newTitle, previousTitle);
        }
      }
      setCurrentTitleEditing(false);
    }
  }, [currentTitle, onTitleChange]);

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        handleSave();
        break;
      case "Escape":
        setCurrentTitleEditing(false);
        break;
    };
  }, [handleSave]);

  const handleClickout = useCallback((event: MouseEvent) => {
    if (
      inputRef.current
      && event.target instanceof HTMLElement
      && event.target !== inputRef.current
      && event.target !== inputRef.current.nextSibling
    ) {
      setCurrentTitleEditing(false);
    }
  }, []);

  const handleTitleEditClick = useCallback(() => {
    if (!currentTitleEditing && inputRef.current) {
      const input = inputRef.current;
      if (currentTitle) {
        input.value = currentTitle;
      }
      setCurrentTitleEditing(true);
      setTimeout(() => {
        input.focus({
          preventScroll: true,
        });
        input.select();
      }, 250);
    }
  }, [currentTitle, currentTitleEditing]);

  const handleTitleSaveClick = useCallback(() => {
    handleSave();
  }, [handleSave]);

  useEffect(() => {
    if (currentTitleEditing && inputRef.current) {
      document.addEventListener("click", handleClickout, { capture: true });
      document.addEventListener("keydown", handleKeydown, { capture: true });

      return () => {
        document.removeEventListener("click", handleClickout, { capture: true });
        document.removeEventListener("keydown", handleKeydown, { capture: true });
      };
    }
  }, [currentTitleEditing, handleClickout, handleKeydown, inputRef]);

  return {
    currentTitle,
    currentTitleEditing,
    handleTitleEditClick,
    handleTitleSaveClick,
    headingRef,
    inputRef,
  };
};
