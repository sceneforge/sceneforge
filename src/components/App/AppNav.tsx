import { useTabs } from "../../hooks/useTabs";
import { SettingsTab } from "../../tabs";
import { usePanel } from "../Panel";
import { useTabPanel } from "../TabPanel";
import { Topbar } from "../Topbar";
import { ToolbarProps } from "../Toolbar";
import { useAppInstall } from "../AppInstall";

export const AppNav = () => {
  const { appTitle } = usePanel();
  const { openTab, defaultTab } = useTabPanel();
  const { newMarkdownTab } = useTabs();
  const { showInstall, openInstallDialog, animateInstallButton } =
    useAppInstall();

  const toolbarEnd: ToolbarProps = {
    icon: "moreVert",
    items: [
      {
        type: "item",
        label: "Home",
        onClick: openTab(defaultTab),
      },
      {
        type: "item",
        label: "About",
        onClick: () => {
          newMarkdownTab({
            id: "about",
            title: "About",
            href: "/docs/about.md",
          });
        },
      },
      {
        type: "item",
        label: "Settings",
        onClick: openTab({
          id: "settings",
          title: "Settings",
          active: true,
          component: SettingsTab,
        }),
      },
    ],
  };

  if (showInstall) {
    toolbarEnd.items = [
      {
        type: "item",
        label: "Install",
        onClick: openInstallDialog,
        extendedClassName: animateInstallButton
          ? "font-bold animate-pulse animate-duration-1000 ring-1 hover:animate-none hover:ring-0 light:ring-light:20 dark:ring-black:20 light:bg-white:10 dark:bg-black:10"
          : undefined,
      },
      ...(toolbarEnd?.items ?? []),
    ];
  }

  return <Topbar toolbarEnd={toolbarEnd} title={appTitle ?? "Scene Forge"} />;
};
