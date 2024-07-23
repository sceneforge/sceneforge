import { blockquoteTransform, markdownComponents } from "@sceneforge/core";
import { Container, type TabComponentProps, Variant, View } from "@sceneforge/ui";
import { Markdown as SimpleMarkdown } from "@simplecomponent/markdown";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAppContext } from "../hooks";

export type MarkdownViewTemplateProps = TabComponentProps<{
  href?: string;
  title?: string;
}>;

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
    <View
      scrollable
    >
      <Container>
        {
          isPending
            ? (<p>Loading...</p>)
            : (
              <SimpleMarkdown
                components={markdownComponents}
                key={i18nHref}
                rehypePlugins={[
                  blockquoteTransform({
                    gallery: {
                      variant: Variant.Accent,
                    },
                  }),
                ]}
                value={data}
              />
            )
        }
      </Container>
    </View>
  );
};

export default MarkdownViewTemplate;
