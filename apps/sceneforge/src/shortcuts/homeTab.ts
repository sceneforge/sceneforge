import { database } from "@sceneforge/data";
import { type CarouselItemProps, IconEnum, Variant } from "@sceneforge/ui";

import type { ShortcutProps } from "../hooks";
import type { DashboardViewTemplate } from "../templates";

export const homeTab: ShortcutProps<typeof DashboardViewTemplate> = async ({
  openScene,
  t,
}) => {
  const createNewScene = async () => {
    const now = new Date();
    const id = await database.scene.add({
      createdAt: now,
      name: "New Scene",
      updatedAt: now,
    });

    if (id) {
      openScene(Number(id).toString(), "New Scene", {
        id: Number(id).toString(),
        title: "New Scene",
      });
    }

    return;
  };
  const scenes = await database.scene.toArray();

  const items = scenes.map(({
    id,
    name,
    thumbnail,
  }) => {
    const carouselItem: CarouselItemProps = {
      img: thumbnail,
      kind: "button",
      label: name,
      onClick: () => openScene(Number(id).toString(), name, {
        id: Number(id).toString(),
        title: name,
      }),
    };

    return carouselItem;
  });

  return {
    carousel: {
      division: 5,
      items: [
        ...items,
        {
          glossy: true,
          icon: IconEnum.Add,
          inverted: true,
          kind: "icon",
          label: "Create New Scene",
          onClick: () => {
            void createNewScene();
          },
          size: 20,
        },
      ],
      itemsVariant: Variant.Accent,
      title: "Latest Scenes",
    },
    title: t("HomeTab.title"),
  };
};
