import { useCallback, useEffect, type ChangeEvent } from "react";
import { Card } from "../../components/Card";
import { InputList, InputListItem } from "../../components/InputList";
import { usePanel } from "../../components/Panel";
import { Tab, useTabPanel } from "../../components/TabPanel";
import { Section } from "../../components/Section";
import { SafeArea } from "../../components/SafeArea";
import { useAppContext } from "../../components/App";
import { useTranslation } from "react-i18next";

export const SettingsTab = Tab(() => {
  const { t } = useTranslation("tabs");
  const { getUserData, setUserData } = usePanel();
  const { tabsPosition, setTabsPosition } = useTabPanel();
  const { name, description, version, dev } = useAppContext();

  const changeTabsPosition = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === "top" || e.target.value === "bottom") {
        setUserData("settings", "tabs-position", e.target.value);
        setTabsPosition(e.target.value);
      } else {
        setUserData("settings", "tabs-position", "bottom");
        setTabsPosition("bottom");
      }
    },
    [setTabsPosition, setUserData]
  );

  useEffect(() => {
    getUserData("settings", "tabs-position", (position) => {
      if (position && typeof position === "string") {
        if (position === "top" || position === "bottom")
          setTabsPosition(position);
      } else {
        setTabsPosition("bottom");
      }
    });
  }, [getUserData, setTabsPosition]);

  return (
    <SafeArea vertical horizonal>
      <Section level={1} title={t("SettingsTab.title")}>
        <Card title={t("SettingsTab.sections.tabs.title")}>
          <InputList>
            <InputListItem
              label={t("SettingsTab.sections.tabs.positionLabel")}
              name="tab-position"
              type="select"
              value={tabsPosition}
              options={[
                {
                  value: "top",
                  text: t("SettingsTab.sections.tabs.positionTopOption"),
                },
                {
                  value: "bottom",
                  text: t("SettingsTab.sections.tabs.positionBottomOption"),
                },
              ]}
              onChange={changeTabsPosition}
            />
          </InputList>
        </Card>
        {dev ? (
          <dl>
            <dt>Info</dt>
            <dd>
              <dl>
                <dt>Name</dt>
                <dd>{name}</dd>
                <dt>Description</dt>
                <dd>{description}</dd>
                <dt>Version</dt>
                <dd>{version}</dd>
              </dl>
            </dd>
          </dl>
        ) : (
          <dl>
            <dt>Version</dt>
            <dd>{version}</dd>
          </dl>
        )}
      </Section>
    </SafeArea>
  );
});
