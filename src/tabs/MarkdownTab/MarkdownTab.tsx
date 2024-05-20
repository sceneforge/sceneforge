import { type TabProps } from "../../components/TabPanel";
import { SafeArea } from "../../components/SafeArea";
import { Markdown, type MarkdownProps } from "../../components/Markdown";

export type MarkdownTabProps = TabProps<MarkdownProps>;

export const MarkdownTab = ({ value, href }: MarkdownTabProps) => {
  return (
    <SafeArea vertical horizonal>
      <Markdown value={value} href={href} />
    </SafeArea>
  );
};
