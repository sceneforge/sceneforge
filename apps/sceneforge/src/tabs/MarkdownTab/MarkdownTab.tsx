import { Markdown, type MarkdownProps } from "../../components/Markdown";
import { SafeArea } from "../../components/SafeArea";
import { type TabProps } from "../../components/TabPanel";

export type MarkdownTabProps = TabProps<MarkdownProps>;

export const MarkdownTab = ({ href, value }: MarkdownTabProps) => {
  return (
    <SafeArea horizonal vertical>
      <Markdown href={href} value={value} />
    </SafeArea>
  );
};
