import { Markdown as SimpleMarkdown } from "@simplecomponent/markdown";
import { components } from "./components";
import { useAppContext } from "../App";
import { useEffect, useMemo, useState } from "react";

export type MarkdownProps = {
  value?: string;
  href?: string;
};

export const Markdown = ({ href, value, ...props }: MarkdownProps) => {
  const { resolvedLanguage, basePath } = useAppContext();
  const [
    currentDocument,
    setCurrentDocument,
  ] = useState<string | undefined>(value);
  const [contentUrl, setContentUrl] = useState<string>("initial-content");

  const i18nHref = useMemo(() => {
    return href && href.startsWith("/docs")
      ? href.replace("/docs", `${basePath}locales/docs/${resolvedLanguage}`)
      : href;
  }, [href, resolvedLanguage, basePath]);

  useEffect(() => {
    if (i18nHref) {
      fetch(i18nHref)
        .then((response) => {
          response
            .text()
            .then((text) => {
              setContentUrl(response.url);
              setCurrentDocument(text);
            })
            .catch((error) => {
              throw new Error("Failed to get the fetched document content", {
                cause: error,
              });
            });
        })
        .catch((error) => {
          throw new Error("Failed to fetch document", { cause: error });
        });
    }
  }, [i18nHref, setCurrentDocument]);

  return (
    <div className="m-inline-auto select-text p-b-2xl text-start c-inherit lg:w-3xl sm:w-lg xl:w-6xl">
      <SimpleMarkdown
        key={contentUrl}
        components={components}
        {...props}
        value={currentDocument}
      />
    </div>
  );
};
