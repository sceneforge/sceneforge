import { useCallback, useState } from "react";

import { useTabs } from "../../hooks/useTabs";
import { type Model } from "../../lib/isModel";
import { useModelContext } from "../ModelContext";

export const useModelListItem = (model: Model) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { closeModelViewTab, newModelViewTab } = useTabs();
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
    closeDeleteModelDialog,
    handleDeleteModel,
    handleOpenModel,
    openDeleteModelDialog,
    showDeleteDialog,
  };
};
