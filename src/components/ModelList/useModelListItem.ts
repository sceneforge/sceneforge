import { useCallback, useState } from "react";
import { type Model } from "../../lib/isModel";
import { useTabs } from "../../hooks/useTabs";
import { useModelContext } from "../ModelContext";

export const useModelListItem = (model: Model) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { newModelViewTab, closeModelViewTab } = useTabs();
  const { deleteModel } = useModelContext();

  const handleOpenModel = useCallback(() => {
    newModelViewTab(model);
  }, [newModelViewTab, model]);

  const openDeleteModelDialog = useCallback(() => {
    if (model.id && showDeleteDialog === false) {
      setShowDeleteDialog(true);
    }
  }, [model, showDeleteDialog]);

  const handleDeleteModel = useCallback(() => {
    if (model.id && showDeleteDialog === true) {
      setShowDeleteDialog(false);
      closeModelViewTab(model.id);
      deleteModel(model.id);
    }
  }, [showDeleteDialog, model, closeModelViewTab, deleteModel]);

  const closeDeleteModelDialog = useCallback(() => {
    setShowDeleteDialog(false);
  }, []);

  return {
    handleOpenModel,
    handleDeleteModel,
    openDeleteModelDialog,
    showDeleteDialog,
    closeDeleteModelDialog,
  };
};
