import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { InputList, InputListItem } from "../../components/InputList";
import { usePanel } from "../../components/Panel";
import { useTabPanel } from "../../components/TabPanel";
import { Section } from "../../components/Section";
import { SafeArea } from "../../components/SafeArea";
import { useAppContext } from "../../components/App";
import { useTranslation } from "react-i18next";

export const SettingsTab = () => {
  const { t } = useTranslation("tabs");
  const {
    name,
    description,
    version,
    development,
    resolvedLanguage,
  } = useAppContext();
  const {
    getUserData,
    setUserData,
    changeLanguage,
    languageList,
    changeShowWelcome,
  } = usePanel();
  const { tabsPosition, setTabsPosition } = useTabPanel();
  const [showWelcome, setShowWelcome] = useState(true);

  const changeTabsPosition = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      if (event.target.value === "top" || event.target.value === "bottom") {
        const position = event.target.value;
        setUserData("settings", "tabs-position", event.target.value)
          .then(() => {
            setTabsPosition(position);
          })
          .catch((error: unknown) => {
            throw new Error("Failed to set tabs position", { cause: error });
          });
      }
      else {
        setUserData("settings", "tabs-position", "bottom")
          .then(() => {
            setTabsPosition("bottom");
          })
          .catch((error: unknown) => {
            throw new Error("Failed to set tabs position", { cause: error });
          });
      }
    },
    [setTabsPosition, setUserData]
  );

  const changeShowWelcomeStartup = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      changeShowWelcome(event.target.checked);
      setShowWelcome(event.target.checked);
    },
    [changeShowWelcome]
  );

  useEffect(() => {
    getUserData("settings", "tabs-position", (position) => {
      if (position && typeof position === "string") {
        if (position === "top" || position === "bottom")
          setTabsPosition(position);
      }
      else {
        setTabsPosition("bottom");
      }
    });
  }, [getUserData, setTabsPosition]);

  useEffect(() => {
    getUserData("settings", "welcome", (show) => {
      if (show && typeof show === "boolean") {
        setShowWelcome(show);
      }
      else if (show === undefined) {
        setShowWelcome(true);
      }
      else {
        setShowWelcome(false);
      }
    });
  }, [getUserData, setShowWelcome]);

  return (
    <SafeArea vertical horizonal>
      <Section level={1} title={t("SettingsTab.title")}>
        <Card title={t("SettingsTab.sections.general.title")}>
          <InputList>
            <InputListItem
              label={t("SettingsTab.sections.general.languageLabel")}
              name="language"
              type="select"
              value={resolvedLanguage}
              options={
                languageList?.map(({ local, translated, locale }) => ({
                  text:
                    local === translated ? local : `${local} (${translated})`,
                  value: locale,
                })) || []
              }
              onChange={changeLanguage}
            />
            <InputListItem
              label={t("SettingsTab.sections.general.showWelcomeLabel")}
              name="show-welcome"
              type="checkbox"
              checked={showWelcome}
              onChange={changeShowWelcomeStartup}
            />
          </InputList>
        </Card>
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
        {development
          ? (
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
          )
          : (
            <dl>
              <dt>Version</dt>
              <dd>{version}</dd>
            </dl>
          )}
      </Section>
    </SafeArea>
  );
};
