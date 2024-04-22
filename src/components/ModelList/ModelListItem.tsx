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
    handleOpenModel,
    openDeleteModelDialog,
    showDeleteDialog,
    closeDeleteModelDialog,
    handleDeleteModel,
  } = useModelListItem(model);
  return (
    <>
      <Card
        variant="accent"
        actions={[
          {
            label: t("ModelListItem.actions.openButton"),
            variant: "accent",
            onClick: handleOpenModel,
          },
          {
            label: t("ModelListItem.actions.deleteButton"),
            icon: "delete",
            variant: "danger",
            onClick: openDeleteModelDialog,
          },
        ]}
        img={model.capture}
        zoom={2}
        title={model.title}
      />
      {showDeleteDialog && (
        <Dialog
          title={t("ModelListItem.deleteDialog.title")}
          description={t("ModelListItem.deleteDialog.description", {
            title: model.title,
          })}
          variant="danger"
          onClose={closeDeleteModelDialog}
          toolbar={{
            withDropdown: false,
            contrast: false,
            items: [
              {
                type: "item",
                label: t("ModelListItem.deleteDialog.actions.cancelButton"),
                variant: "default",
                onClick: closeDeleteModelDialog,
              },
              {
                type: "item",
                label: t("ModelListItem.deleteDialog.actions.deleteButton"),
                variant: "danger",
                onClick: handleDeleteModel,
              },
            ],
          }}
        />
      )}
    </>
  );
};
