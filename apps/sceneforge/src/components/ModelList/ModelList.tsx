import { IconEnum, Variant } from "@sceneforge/ui";
import { useTranslation } from "react-i18next";

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

  return (
    <Carousel title={t("title")}>
      {models.map((model, index) => (
        <ModelListItem key={index} model={model} />
      ))}
      <HeroIconButton
        icon={IconEnum.Add}
        label={t("actions.newButton")}
        onClick={() => void 0}
        variant={Variant.Accent}
      />
    </Carousel>
  );
};
