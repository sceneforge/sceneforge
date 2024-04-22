import { useTranslation } from "react-i18next";
import { Carousel } from "../Carousel";
import { HeroIconButton } from "../HeroIconButton";
import { useModelList } from "./useModelList";
import { ModelListItem } from "./ModelListItem";

export type ModelListProps = {
  active?: boolean;
};

export const ModelList = ({ active }: ModelListProps) => {
  const { t } = useTranslation("ModelList");
  const { models, openNewModel } = useModelList({ active });

  return (
    <Carousel title={t("title")}>
      {models.map((model, index) => (
        <ModelListItem key={index} model={model} />
      ))}
      <HeroIconButton
        icon="add"
        label={t("actions.newButton")}
        variant="accent"
        onClick={openNewModel}
      />
    </Carousel>
  );
};
