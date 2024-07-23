import type { ShortcutProps } from "../hooks";
import type { MarkdownViewTemplate } from "../templates";

export const aboutTab: ShortcutProps<typeof MarkdownViewTemplate> = ({
  t,
}) => ({
  href: "/docs/about.md",
  title: t("AboutTab.title"),
});
