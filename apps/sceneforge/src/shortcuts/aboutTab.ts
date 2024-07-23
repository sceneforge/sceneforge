import type { ShortcutProps } from "../hooks";
import type { MarkdownViewTab } from "../templates";

export const aboutTab: ShortcutProps<typeof MarkdownViewTab> = ({
  t,
}) => ({
  href: "/docs/about.md",
  title: t("AboutTab.title"),
});
