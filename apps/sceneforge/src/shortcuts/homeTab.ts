import { database } from "@sceneforge/data";
import { type CarouselItemProps, IconEnum, Shape, Variant } from "@sceneforge/ui";

import type { ShortcutProps } from "../hooks";
import type { DashboardViewTab } from "../templates";

export const homeTab: ShortcutProps<typeof DashboardViewTab> = async ({
  openScene,
  t,
}) => {
  const createNewScene = async () => {
    const now = new Date();
    const id = await database.scene.add({
      createdAt: now,
      name: t("SceneTab.newSceneTitle"),
      updatedAt: now,
    });

    if (id) {
      openScene(Number(id).toString(), t("SceneTab.newSceneTitle"), {
        id: Number(id).toString(),
        title: t("SceneTab.newSceneTitle"),
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
      items: [
        ...items,
        {
          glossy: true,
          icon: IconEnum.Add,
          inverted: true,
          kind: "icon",
          label: t("HomeTab.sections.latestScenes.createNewSceneLabel"),
          onClick: () => {
            void createNewScene();
          },
          shape: Shape.Squircle,
          size: 20,
        },
      ],
      itemsVariant: Variant.Accent,
      title: t("HomeTab.sections.latestScenes.title"),
    },
    title: t("HomeTab.title"),
  };
};
