import { useCallback, type ChangeEvent } from "react";
import { Card } from "../../components/Card";
import { InputList, InputListItem } from "../../components/InputList";
import { SafeArea } from "../../components/SafeArea";
import { getThemeColor, setThemeColor } from "../../lib/themeColor";

export const SettingsPage = () => {
  const themeColor = getThemeColor() ?? undefined;

  const changeThemeColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setThemeColor(e.target.value);
  }, []);

  return (
    <SafeArea>
      <h1>Settings</h1>
      <Card title="Color Scheme">
        <InputList>
          <InputListItem
            defaultValue={themeColor}
            label="Color Theme"
            name="theme-color"
            type="color"
            onChange={changeThemeColor}
          />
        </InputList>
      </Card>
    </SafeArea>
  );
};
