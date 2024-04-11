import { Markdown as SimpleMarkdown } from "@simplecomponent/markdown";
import { components } from "./components";
import { useAppContext } from "../App";

export type MarkdownProps = {
  value?: string;
  href?: string;
};

export const Markdown = ({ href, ...props }: MarkdownProps) => {
  const { resolvedLanguage } = useAppContext();
  const i18nHref =
    href && href.startsWith("/") ? `/locales/${resolvedLanguage}${href}` : href;
  return (
    <div className="m-inline-auto w-full select-text text-start c-inherit lg:w-3xl sm:w-lg xl:w-6xl">
      <SimpleMarkdown components={components} {...props} href={i18nHref} />
    </div>
  );
};
