import { Card, Dialog, IconEnum, Variant } from "@sceneforge/ui";
import { useTranslation } from "react-i18next";

import { type Model } from "../../lib/isModel";
import { useModelListItem } from "./useModelListItem";

export type ModelListItemProps = {
  model: Model;
};

export const ModelListItem = ({ model }: ModelListItemProps) => {
  const { t } = useTranslation("ModelList");
  const {
    closeDeleteModelDialog,
    handleDeleteModel,
    openDeleteModelDialog,
    showDeleteDialog,
  } = useModelListItem(model);
  return (
    <>
      <Card
        actions={[
          {
            kind: "button",
            label: t("ModelListItem.actions.openButton"),
            onClick: () => void 0,
            variant: Variant.Accent,
          },
          {
            icon: IconEnum.Delete,
            kind: "icon",
            label: t("ModelListItem.actions.deleteButton"),
            onClick: openDeleteModelDialog,
            variant: Variant.Danger,
          },
        ]}
        img={model.capture}
        label={model.title}
        variant={Variant.Accent}
      />
      {showDeleteDialog && (
        <Dialog
          actions={[
            {
              kind: "button",
              label: t("ModelListItem.deleteDialog.actions.cancelButton"),
              onClick: closeDeleteModelDialog,
              variant: Variant.Default,
            },
            {
              kind: "button",
              label: t("ModelListItem.deleteDialog.actions.deleteButton"),
              onClick: handleDeleteModel,
              variant: Variant.Danger,
            },
          ]}
          description={t("ModelListItem.deleteDialog.description", {
            title: model.title,
          })}
          onClose={closeDeleteModelDialog}
          title={t("ModelListItem.deleteDialog.title")}
          variant={Variant.Danger}
        />
      )}
    </>
  );
};
