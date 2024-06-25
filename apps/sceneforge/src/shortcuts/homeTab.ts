import { CardButton, type CardButtonProps, Variant } from "@sceneforge/ui";
import { createElement } from "react";

import type { DashboardViewTemplate } from "../tabTemplates";

import { ShortcutProps } from "./ShortcutProps";

const generateSampleCardButtons = (count: number) => {
  const cardButtons: CardButtonProps[] = [];
  for (let index = 0; index < count; index++) {
    cardButtons.push({
      img: `https://picsum.photos/seed/${501 + index}/500`,
      onClick: () => {
        console.log(`DEBUG: onClick Scene ${index + 1}`);
      },
      title: `Scene ${index + 1}`,
      variant: Variant.Accent,
    });
  }
  return cardButtons;
};

export const homeTab: ShortcutProps<typeof DashboardViewTemplate> = (
  _i18n,
  t
) => ({
  carousel: {
    division: 5,
    items: generateSampleCardButtons(10).map((props) => {
      return createElement(CardButton, props);
    }),
    title: "Latest Scenes",
  },
  title: t("HomeTab.title"),
});
