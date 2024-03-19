import { default as MarkedReact, type ReactRenderer } from "marked-react";
import { Heading } from "../Heading";
import { useEffect, useState } from "react";
import { markedProps } from "../../lib/markedProps";

export type MarkdownProps = {
  value?: string;
  isInline?: boolean;
  file?: string;
};

const renderer: Partial<ReactRenderer> = {
  heading: (text: string, level: 1 | 2 | 3 | 4 | 5 | 6) => {
    return (
      <Heading
        {...markedProps("heading")}
        level={level}
        className="m-b-4 m-t-0 text-start c-inherit text-shadow-xl"
      >
        {text}
      </Heading>
    );
  },
  paragraph: (text: string) => {
    return <p {...markedProps("paragraph")}>{text}</p>;
  },
};

export const Markdown = ({ isInline, value, file }: MarkdownProps) => {
  const [content, setContent] = useState<string>(value ?? "");

  useEffect(() => {
    if (file) {
      fetch(file).then((response) => {
        response.text().then(setContent);
      });
    }
  }, [file]);

  return (
    <div className="m-inline-auto w-full select-text text-start c-inherit lg:w-3xl sm:w-lg xl:w-6xl">
      <MarkedReact isInline={isInline} value={content} renderer={renderer} />
    </div>
  );
};
