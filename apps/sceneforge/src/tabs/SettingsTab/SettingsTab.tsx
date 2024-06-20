import { Card } from "@sceneforge/ui";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppContext } from "../../components/App";
import { InputList, InputListItem } from "../../components/InputList";
import { usePanel } from "../../components/Panel";
import { SafeArea } from "../../components/SafeArea";
import { Section } from "../../components/Section";

export const SettingsTab = () => {
  const { t } = useTranslation("tabs");
  const {
    description,
    development,
    name,
    resolvedLanguage,
    version,
  } = useAppContext();
  const {
    changeLanguage,
    changeShowWelcome,
    getUserData,
    languageList,
    setUserData,
  } = usePanel();
  const [showWelcome, setShowWelcome] = useState(true);

  const changeTabsPosition = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      if (event.target.value === "top" || event.target.value === "bottom") {
        // const position = event.target.value;
        setUserData("settings", "tabs-position", event.target.value)
          .then(() => {
            // setTabsPosition(position);
          })
          .catch((error: unknown) => {
            throw new Error("Failed to set tabs position", { cause: error });
          });
      }
      else {
        setUserData("settings", "tabs-position", "bottom")
          .then(() => {
            // setTabsPosition("bottom");
          })
          .catch((error: unknown) => {
            throw new Error("Failed to set tabs position", { cause: error });
          });
      }
    },
    [setUserData]
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
        if (position === "top" || position === "bottom") {
          // setTabsPosition(position);
        }
      }
      else {
        // setTabsPosition("bottom");
      }
    });
  }, [getUserData]);

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
    <SafeArea horizonal vertical>
      <Section level={1} title={t("SettingsTab.title")}>
        <Card title={t("SettingsTab.sections.general.title")}>
          <InputList>
            <InputListItem
              label={t("SettingsTab.sections.general.languageLabel")}
              name="language"
              onChange={changeLanguage}
              options={
                languageList?.map(({ local, locale, translated }) => ({
                  text:
                    local === translated ? local : `${local} (${translated})`,
                  value: locale,
                })) || []
              }
              type="select"
              value={resolvedLanguage}
            />
            <InputListItem
              checked={showWelcome}
              label={t("SettingsTab.sections.general.showWelcomeLabel")}
              name="show-welcome"
              onChange={changeShowWelcomeStartup}
              type="checkbox"
            />
          </InputList>
        </Card>
        <Card title={t("SettingsTab.sections.tabs.title")}>
          <InputList>
            <InputListItem
              label={t("SettingsTab.sections.tabs.positionLabel")}
              name="tab-position"
              onChange={changeTabsPosition}
              options={[
                {
                  text: t("SettingsTab.sections.tabs.positionTopOption"),
                  value: "top",
                },
                {
                  text: t("SettingsTab.sections.tabs.positionBottomOption"),
                  value: "bottom",
                },
              ]}
              type="select"
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
