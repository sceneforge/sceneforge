import { useTabs } from "../../hooks/useTabs";
import { SettingsTab } from "../../tabs";
import { usePanel } from "../Panel";
import { useTabPanel } from "../TabPanel";
import { Topbar } from "../Topbar";
import { ToolbarProps } from "../Toolbar";

export const AppNav = () => {
  const { appTitle } = usePanel();
  const { openTab, defaultTab } = useTabPanel();
  const { newMarkdownTab } = useTabs();

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

  return <Topbar toolbarEnd={toolbarEnd} title={appTitle ?? "Scene Forge"} />;
};
