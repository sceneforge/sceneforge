import { Dialog, Icon, IconEnum, Variant } from "@sceneforge/ui";
import {
  type ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { fetchContent } from "../../lib/fetchContent";
import {
  type Highlight,
  WelcomeData,
  isWelcomeData,
} from "../../lib/isWelcomeData";
import { useAppContext } from "../App";
import { Highlights } from "../Highlights";
import { usePanel } from "../Panel";

export const Welcome = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const { t } = useTranslation("Welcome");
  const { resolvedLanguage } = useAppContext();
  const { changeLanguage, changeShowWelcome, languageList } = usePanel();
  const languageId = useId();

  const handleClose = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handleHideWelcome = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      changeShowWelcome(!event.target.checked);
    },
    [changeShowWelcome]
  );

  useEffect(() => {
    if (resolvedLanguage && showWelcome) {
      fetchContent<WelcomeData>(resolvedLanguage, "/welcome.json")
        .then((data) => {
          if (isWelcomeData(data) && data.highlights.length > 0) {
            setHighlights(data.highlights);
          }
        })
        .catch((error) => {
          throw new Error("Failed to fetch welcome data", { cause: error });
        });
    }
  }, [resolvedLanguage, showWelcome]);

  const showWelcomeDialog = useMemo(
    () => showWelcome && highlights && highlights.length > 0,
    [showWelcome, highlights]
  );

  return (
    showWelcomeDialog && (
      <Dialog
        onClose={handleClose}
        open={true}
        title={t("title")}
        variant={Variant.Default}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Highlights
            extendedClassName="w-xs h-xs sm:w-sm md:w-md md:h-sm lg:w-2xl lg:h-lg xl:w-3xl xl:h-xl"
            items={highlights}
          />
          <div className="m-t-2 flex flex-row items-center justify-stretch gap-5">
            <div className="flex-grow">
              {languageList && languageList.length > 1 && (
                <div className="flex flex-row items-center justify-start gap-1">
                  <label htmlFor={languageId}>
                    <Icon icon={IconEnum.Globe} />
                  </label>
                  <select
                    className="accent-accent"
                    defaultValue={resolvedLanguage}
                    id={languageId}
                    onChange={changeLanguage}
                  >
                    {languageList.map(({ local, locale, translated }) => (
                      <option key={locale} value={locale}>
                        {local === translated
                          ? local
                          : `${local} (${translated})`}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <label className="flex flex-shrink flex-row items-center gap-2 opacity-50 hover:opacity-100">
              <input
                className="flex-shrink accent-accent"
                name="hide-welcome"
                onChange={handleHideWelcome}
                type="checkbox"
              />
              <span className="flex-shrink">{t("dontShowMessageLabel")}</span>
            </label>
          </div>
        </Suspense>
      </Dialog>
    )
  );
};
