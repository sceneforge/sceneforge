import { useCallback, useEffect, type ChangeEvent } from "react";
import { Card } from "../../components/Card";
import { InputList, InputListItem } from "../../components/InputList";
import { usePanel } from "../../components/Panel";
import { Tab, useTabPanel } from "../../components/TabPanel";
import { Section } from "../../components/Section";
import { SafeArea } from "../../components/SafeArea";

export const SettingsTab = Tab(() => {
  const { getUserData, setUserData } = usePanel();
  const { tabsPosition, setTabsPosition } = useTabPanel();

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
      <Section level={1} title="Settings">
        <Card title="Tabs">
          <InputList>
            <InputListItem
              label="Position"
              name="tab-position"
              type="select"
              value={tabsPosition}
              options={[
                { value: "top", text: "Top" },
                { value: "bottom", text: "Bottom" },
              ]}
              onChange={changeTabsPosition}
            />
          </InputList>
        </Card>
      </Section>
    </SafeArea>
  );
});
