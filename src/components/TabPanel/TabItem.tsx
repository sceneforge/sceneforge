import { useTranslation } from "react-i18next";
import { cls } from "../../lib/cls";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { useTabPanel } from "./useTabPanel";
import { useMemo } from "react";
import { useAppContext } from "../App";

export interface TabItemProps {
  title: string;
  translation?: {
    ns: string;
    key: string;
  };
  active?: boolean;
  index?: number;
  onCloseClick?: () => void;
  onActiveClick?: () => void;
}

export const TabItem = ({
  title,
  translation,
  onCloseClick,
  onActiveClick,
  active,
  index,
}: TabItemProps) => {
  const { resolvedLanguage } = useAppContext();
  const { t } = useTranslation();
  const { tabsPosition } = useTabPanel();

  const tabTitle = useMemo(() => {
    if (translation) {
      return t(translation.key, {
        ns: translation.ns,
        lng: resolvedLanguage,
      });
    } else if (title) {
      return title;
    }
    return " -- ";
  }, [translation, title, t, resolvedLanguage]);

  return (
    <li className="relative max-w-80 min-w-24 overflow-clip c-inherit">
      <div className="h-full w-full flex flex-row items-center justify-stretch">
        <Button
          className={cls(
            "c-inherit b-none b-0 flex-grow p-block-3 p-inline-2 text-start text-nowrap text-ellipsis w-full h-full overflow-clip bg-transparent siblings:bg-transparent siblings:c-transparent aria-selected:bg-accent:65 siblings:aria-selected:bg-accent:65 siblings:aria-selected:c-light:25 siblings:hover:c-light:50",
            tabsPosition === "top" ? "rounded-tl-2" : "rounded-bl-2"
          )}
          aria-controls={`tabpanel-${index}`}
          aria-label={tabTitle}
          aria-selected={active ? "true" : "false"}
          role="tab"
          tabIndex={active ? -1 : 0}
          title={tabTitle}
          onClick={onActiveClick}
        >
          {tabTitle}
        </Button>
        <IconButton
          className={cls(
            "b-none b-0 flex-shrink p-block-3 p-inline-2 h-full hover:c-light:100 cursor-pointer",
            tabsPosition === "top" ? "rounded-tr-2" : "rounded-br-2"
          )}
          icon="close"
          label={t("TabPanel:TabItem.actions.closeButton")}
          tabIndex={-1}
          onClick={onCloseClick}
        />
      </div>
    </li>
  );
};
