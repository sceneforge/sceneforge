import { useCurrentId } from "@sceneforge/ui";
import { useCallback, useMemo } from "react";

export type UseHotspotPopoverProps = {
  defaultDescription?: string;
  defaultDistance?: number;
  defaultLabel?: string;
  defaultUrl?: string;
  id?: string;
};

export const useHotspotPopover = ({
  defaultLabel,
  id,
}: UseHotspotPopoverProps) => {
  const currentId = useCurrentId(id);
  const currentFormId = useMemo(() => `${currentId}-form`, [currentId]);
  const isNew = useMemo(() => {
    return Boolean(defaultLabel);
  }, [defaultLabel]);

  const handleFormAction = useCallback((formData: FormData) => {
    console.log("DEBUG: Hotspot form data", [...formData.entries()]);
  }, []);

  const currentTitle = useMemo(() => {
    return isNew ? "Edit Hotspot" : "New Hotspot";
  }, [isNew]);

  const currentSubmitLabel = useMemo(() => {
    return isNew ? "Update" : "Create";
  }, [isNew]);

  return {
    currentFormId,
    currentId,
    currentSubmitLabel,
    currentTitle,
    handleFormAction,
    isNew,
  };
};
