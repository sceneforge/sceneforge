import { useCallback, useState } from "react";

import { type Model } from "../../lib/isModel";
import { useModelContext } from "../ModelContext";

export const useModelListItem = (model: Model) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteModel } = useModelContext();

  const openDeleteModelDialog = useCallback(() => {
    if (model.id && showDeleteDialog === false) {
      setShowDeleteDialog(true);
    }
  }, [model, showDeleteDialog]);

  const handleDeleteModel = useCallback(() => {
    if (model.id && showDeleteDialog === true) {
      setShowDeleteDialog(false);
      deleteModel(model.id);
    }
  }, [showDeleteDialog, model, deleteModel]);

  const closeDeleteModelDialog = useCallback(() => {
    setShowDeleteDialog(false);
  }, []);

  return {
    closeDeleteModelDialog,
    handleDeleteModel,
    openDeleteModelDialog,
    showDeleteDialog,
  };
};
