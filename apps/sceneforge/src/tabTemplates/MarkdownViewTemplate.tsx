import { Container } from "@sceneforge/ui";
import { Markdown as SimpleMarkdown } from "@simplecomponent/markdown";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAppContext } from "../components/App";
import { markdownComponents } from "../lib/markdownComponents";

export type MarkdownViewTemplateProps = {
  href?: string;
  title?: string;
};

const MarkdownViewTemplate = ({
  href,
}: MarkdownViewTemplateProps) => {
  const { i18n: { resolvedLanguage } } = useTranslation();
  const { basePath } = useAppContext();

  const i18nHref = useMemo(() => {
    return href && href.startsWith("/docs")
      ? href.replace("/docs", `${basePath}locales/docs/${resolvedLanguage}`)
      : href;
  }, [href, basePath, resolvedLanguage]);

  const { data, isPending } = useQuery({
    queryFn: async () => {
      if (!i18nHref) return "";
      const response = await fetch(i18nHref);
      return await response.text();
    },
    queryKey: ["markdown", i18nHref],
  });

  if (isPending) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <Container>
      {
        isPending
          ? (<p>Loading...</p>)
          : (
            <SimpleMarkdown
              components={markdownComponents}
              key={i18nHref}
              value={data}
            />
          )
      }
    </Container>
  );
};

export default MarkdownViewTemplate;
