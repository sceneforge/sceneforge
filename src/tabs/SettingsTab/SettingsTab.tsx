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
  const { t, i18n } = useTranslation("tabs");
  const {
    name,
    description,
    version,
    dev,
    resolvedLanguage,
    setResolvedLanguage,
    languages,
  } = useAppContext();
  const { getUserData, setUserData } = usePanel();
  const { tabsPosition, setTabsPosition } = useTabPanel();

  const changeTabsPosition = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      if (e.target.value === "top" || e.target.value === "bottom") {
        const position = e.target.value;
        setUserData("settings", "tabs-position", e.target.value)
          .then(() => {
            setTabsPosition(position);
          })
          .catch((err: unknown) => {
            throw new Error("Failed to set tabs position", { cause: err });
          });
      } else {
        setUserData("settings", "tabs-position", "bottom")
          .then(() => {
            setTabsPosition("bottom");
          })
          .catch((err: unknown) => {
            throw new Error("Failed to set tabs position", { cause: err });
          });
      }
    },
    [setTabsPosition, setUserData],
  );

  const changeLanguage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value) {
        const language = e.target.value;
        setUserData("settings", "language", language)
          .then(() => {
            if (setResolvedLanguage) {
              setResolvedLanguage(language);
            }
            i18n
              .changeLanguage(language)
              .then(() => {
                i18n.dir(language);
              })
              .catch((err: unknown) => {
                throw new Error("Failed to change language", { cause: err });
              });
          })
          .catch((err: unknown) => {
            throw new Error("Failed to set language", { cause: err });
          });
      }
    },
    [setUserData, setResolvedLanguage, i18n],
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
        <Card title={t("SettingsTab.sections.general.title")}>
          <InputList>
            <InputListItem
              label={t("SettingsTab.sections.general.languageLabel")}
              name="language"
              type="select"
              value={resolvedLanguage}
              options={
                languages?.map((locale) => ({
                  text:
                    t(`locales.${locale}`, {
                      ns: "common",
                      defaultValue: locale,
                      lng: locale,
                    }) +
                    (resolvedLanguage !== locale
                      ? ` (${t(`locales.${locale}`, {
                          ns: "common",
                          defaultValue: locale,
                        })})`
                      : ""),
                  value: locale,
                })) ?? []
              }
              onChange={changeLanguage}
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
        {dev ? (
          <dl>
            <dt>{"Info"}</dt>
            <dd>
              <dl>
                <dt>{"Name"}</dt>
                <dd>{name}</dd>
                <dt>{"Description"}</dt>
                <dd>{description}</dd>
                <dt>{"Version"}</dt>
                <dd>{version}</dd>
              </dl>
            </dd>
          </dl>
        ) : (
          <dl>
            <dt>{"Version"}</dt>
            <dd>{version}</dd>
          </dl>
        )}
      </Section>
    </SafeArea>
  );
});
