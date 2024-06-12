import { Card, Variant } from "@sceneforge/ui";
import { useTranslation } from "react-i18next";

import { type Model } from "../../lib/isModel";
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
            type: "button",
            variant: Variant.Accent,
          },
          {
            icon: "delete",
            label: t("ModelListItem.actions.deleteButton"),
            onClick: openDeleteModelDialog,
            type: "icon",
            variant: Variant.Danger,
          },
        ]}
        img={model.capture}
        title={model.title}
        variant={Variant.Accent}
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
            actions: [
              {
                label: t("ModelListItem.deleteDialog.actions.cancelButton"),
                onClick: closeDeleteModelDialog,
                type: "button",
                variant: Variant.Default,
              },
              {
                label: t("ModelListItem.deleteDialog.actions.deleteButton"),
                onClick: handleDeleteModel,
                type: "button",
                variant: Variant.Danger,
              },
            ],
            contrast: false,
            withDropdown: false,
          }}
          variant={Variant.Danger}
        />
      )}
    </>
  );
};
