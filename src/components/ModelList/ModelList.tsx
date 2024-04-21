import { useTranslation } from "react-i18next";
import { Carousel } from "../Carousel";
import { HeroIconButton } from "../HeroIconButton";
import { Card } from "../Card";
import { useModelList } from "./useModelList";

export type ModelListProps = {
  active?: boolean;
};

export const ModelList = ({ active }: ModelListProps) => {
  const { t } = useTranslation("ModelList");
  const { models, openModel, deleteModel } = useModelList({ active });

  return (
    <Carousel title={t("title")}>
      {models.map((model, index) => (
        <Card
          variant="accent"
          actions={[
            {
              label: t("actions.openButton"),
              variant: "accent",
              onClick: openModel(model),
            },
            {
              label: t("actions.deleteButton"),
              icon: "delete",
              variant: "danger",
              onClick: deleteModel(model),
            },
          ]}
          img={model.capture}
          zoom={2}
          key={index}
          title={model.title}
        />
      ))}
      <HeroIconButton
        icon="add"
        label={t("actions.newButton")}
        variant="accent"
        onClick={openModel()}
      />
    </Carousel>
  );
};
