import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { Card } from "../../components/Card";
import { InputList, InputListItem } from "../../components/InputList";
import { usePanel } from "../../components/Panel";
import { SafeArea } from "../../components/SafeArea";
import { Tab } from "../../components/TabPanel";
import { getThemeColor, setThemeColor } from "../../lib/themeColor";

export const SettingsTab = Tab(() => {
  const { getUserData, setUserData } = usePanel();
  const [colorReference, setColorReference] = useState(getThemeColor() ?? undefined);

  const changeThemeColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setThemeColor(e.target.value);
    setUserData("colorScheme", "color-reference", e.target.value);
    setColorReference(e.target.value);
  }, [setUserData]);

  useEffect(() => {
    getUserData("colorScheme", "color-reference", (color) => {
      if (color && typeof color === "string" && color.startsWith("#")) {
        setThemeColor(color);
        setColorReference(color);
      }
    });
  }, [getUserData, setColorReference]);

  return (
    <SafeArea>
      <h1>Settings</h1>
      <Card title="Color Scheme">
        <InputList>
          <InputListItem
            label="Color Theme"
            name="theme-color"
            type="color"
            value={colorReference}
            onChange={changeThemeColor}
          />
        </InputList>
      </Card>
    </SafeArea>
  );
});
