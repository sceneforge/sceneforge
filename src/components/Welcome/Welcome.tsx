import {
  useState,
  useCallback,
  useId,
  type ChangeEvent,
  useEffect,
  Suspense,
  useMemo,
} from "react";
import { Dialog } from "../Dialog";
import { Highlights } from "../Highlights";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App";
import { usePanel } from "../Panel";
import { Icon } from "../Icon";
import {
  type Highlight,
  isWelcomeData,
  WelcomeData,
} from "../../lib/isWelcomeData";
import { fetchContent } from "../../lib/fetchContent";

export const Welcome = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const { t } = useTranslation("Welcome");
  const { resolvedLanguage } = useAppContext();
  const { changeLanguage, languageList, changeShowWelcome } = usePanel();
  const languageId = useId();

  const handleClose = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handleHideWelcome = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    changeShowWelcome(!ev.target.checked);
  }, []);

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
    [showWelcome, highlights],
  );

  return (
    showWelcomeDialog && (
      <Dialog
        variant="default"
        open={true}
        title={t("title")}
        onClose={handleClose}
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
                    <Icon icon="globe" />
                  </label>
                  <select
                    id={languageId}
                    className="accent-accent"
                    defaultValue={resolvedLanguage}
                    onChange={changeLanguage}
                  >
                    {languageList.map(({ local, translated, locale }) => (
                      <option key={locale} value={locale}>
                        {local !== translated
                          ? `${local} (${translated})`
                          : local}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <label className="flex flex-shrink flex-row items-center gap-2 opacity-50 hover:opacity-100">
              <input
                className="flex-shrink accent-accent"
                type="checkbox"
                name="hide-welcome"
                onChange={handleHideWelcome}
              />
              <span className="flex-shrink">{t("dontShowMessageLabel")}</span>
            </label>
          </div>
        </Suspense>
      </Dialog>
    )
  );
};
