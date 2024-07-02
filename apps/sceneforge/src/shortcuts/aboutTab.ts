import type { MarkdownViewTemplate } from "../tabTemplates";
import type { ShortcutProps } from "./ShortcutProps";

export const aboutTab: ShortcutProps<typeof MarkdownViewTemplate> = ({
  t,
}) => ({
  href: "/docs/about.md",
  title: t("AboutTab.title"),
});
