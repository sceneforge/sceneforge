import type { MarkdownViewTemplate } from "../tabTemplates";
import type { ShortcutProps } from "./ShortcutProps";

export const aboutTab: ShortcutProps<typeof MarkdownViewTemplate> = (
  _i18n,
  t
) => ({
  href: "/docs/about.md",
  title: t("AboutTab.title"),
});
