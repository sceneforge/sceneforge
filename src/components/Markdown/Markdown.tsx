import { Markdown as SimpleMarkdown } from "@simplecomponent/markdown";
import { components } from "./components";
import { useAppContext } from "../App";
import { useEffect, useMemo, useState } from "react";

export type MarkdownProps = {
  value?: string;
  href?: string;
};

export const Markdown = ({ href, value, ...props }: MarkdownProps) => {
  const { resolvedLanguage } = useAppContext();
  const [currentDoc, setCurrentDoc] = useState<string | undefined>(value);
  const [contentUrl, setContentUrl] = useState<string>("initial-content");

  const i18nHref = useMemo(() => {
    return href && href.startsWith("/docs")
      ? href.replace("/docs", `/locales/docs/${resolvedLanguage}`)
      : href;
  }, [href, resolvedLanguage]);

  useEffect(() => {
    if (i18nHref) {
      fetch(i18nHref).then((response) => {
        response.text().then((text) => {
          setContentUrl(response.url);
          setCurrentDoc(text);
        });
      });
    }
  }, [i18nHref, setCurrentDoc]);

  return (
    <div className="m-inline-auto w-full select-text text-start c-inherit lg:w-3xl sm:w-lg xl:w-6xl">
      <SimpleMarkdown
        key={contentUrl}
        components={components}
        {...props}
        value={currentDoc}
      />
    </div>
  );
};
