import { useTranslation } from "react-i18next";
import { Carousel } from "../Carousel";
import { HeroIconButton } from "../HeroIconButton";
import { useModelList } from "./useModelList";
import { ModelListItem } from "./ModelListItem";
import { useShortcuts } from "../../hooks/useShortcuts";

export type ModelListProps = {
  active?: boolean;
};

export const ModelList = ({ active }: ModelListProps) => {
  const { t } = useTranslation("ModelList");
  const { models } = useModelList({ active });
  const { newTabScene } = useShortcuts();

  return (
    <Carousel title={t("title")}>
      {models.map((model, index) => (
        <ModelListItem key={index} model={model} />
      ))}
      <HeroIconButton
        icon="add"
        label={t("actions.newButton")}
        variant="accent"
        onClick={newTabScene}
      />
    </Carousel>
  );
};
