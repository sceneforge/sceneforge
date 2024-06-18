import { Variant } from "@sceneforge/ui";
import { useTranslation } from "react-i18next";

import { useShortcuts } from "../../hooks/useShortcuts";
import { Carousel } from "../Carousel";
import { HeroIconButton } from "../HeroIconButton";
import { ModelListItem } from "./ModelListItem";
import { useModelList } from "./useModelList";

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
        onClick={newTabScene}
        variant={Variant.Accent}
      />
    </Carousel>
  );
};
