import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { Card } from "../../components/Card";
import { InputList, InputListItem } from "../../components/InputList";
import { usePanel } from "../../components/Panel";
import { SafeArea } from "../../components/SafeArea";
import { Tab, useTabPanel } from "../../components/TabPanel";
import { getThemeColor, setThemeColor } from "../../lib/themeColor";

export const SettingsTab = Tab(() => {
  const { getUserData, setUserData } = usePanel();
  const [colorTheme, setColorTheme] = useState(getThemeColor() ?? undefined);
  const { tabsPosition, setTabsPosition } = useTabPanel();

  const changeThemeColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setThemeColor(e.target.value);
    setUserData("settings", "color-theme", e.target.value);
    setColorTheme(e.target.value);
  }, [setUserData]);

  const changeTabsPosition = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "top" || e.target.value === "bottom") {
      setUserData("settings", "tabs-position", e.target.value);
      setTabsPosition(e.target.value);
    } else {
      setUserData("settings", "tabs-position", "bottom");
      setTabsPosition("bottom");
    }
  }, [setTabsPosition, setUserData]);

  useEffect(() => {
    getUserData("settings", "color-theme", (color) => {
      if (color && typeof color === "string" && color.startsWith("#")) {
        setThemeColor(color);
        setColorTheme(color);
      }
    });
    getUserData("settings", "tabs-position", (position) => {
      console.log("DEBUG: position", position);
      if (position && typeof position === "string") {
        if (position === "top" || position === "bottom")
          setTabsPosition(position);
      } else {
        setTabsPosition("bottom");
      }
    });
  }, [getUserData, setColorTheme, setTabsPosition]);

  return (
    <SafeArea>
      <h1>Settings</h1>
      <Card title="Color Scheme">
        <InputList>
          <InputListItem
            label="Color Theme"
            name="theme-color"
            type="color"
            value={colorTheme}
            onChange={changeThemeColor}
          />
        </InputList>
      </Card>
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
    </SafeArea>
  );
});
