import { useTranslation } from "react-i18next";

import { type Model } from "../../lib/isModel";
import { Card } from "../Card";
import { Dialog } from "../Dialog";
import { useModelListItem } from "./useModelListItem";

export type ModelListItemProps = {
  model: Model;
};

export const ModelListItem = ({ model }: ModelListItemProps) => {
  const { t } = useTranslation("ModelList");
  const {
    closeDeleteModelDialog,
    handleDeleteModel,
    handleOpenModel,
    openDeleteModelDialog,
    showDeleteDialog,
  } = useModelListItem(model);
  return (
    <>
      <Card
        actions={[
          {
            label: t("ModelListItem.actions.openButton"),
            onClick: handleOpenModel,
            variant: "accent",
          },
          {
            icon: "delete",
            label: t("ModelListItem.actions.deleteButton"),
            onClick: openDeleteModelDialog,
            variant: "danger",
          },
        ]}
        img={model.capture}
        title={model.title}
        variant="accent"
        zoom={2}
      />
      {showDeleteDialog && (
        <Dialog
          description={t("ModelListItem.deleteDialog.description", {
            title: model.title,
          })}
          onClose={closeDeleteModelDialog}
          title={t("ModelListItem.deleteDialog.title")}
          toolbar={{
            contrast: false,
            items: [
              {
                label: t("ModelListItem.deleteDialog.actions.cancelButton"),
                onClick: closeDeleteModelDialog,
                type: "item",
                variant: "default",
              },
              {
                label: t("ModelListItem.deleteDialog.actions.deleteButton"),
                onClick: handleDeleteModel,
                type: "item",
                variant: "danger",
              },
            ],
            withDropdown: false,
          }}
          variant="danger"
        />
      )}
    </>
  );
};
