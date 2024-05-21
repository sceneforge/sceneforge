export type MarkdownAction = {
  type: "markdown";
  label: string;
  path: string;
};

export type Highlight = {
  title: string;
  description?: string;
  image?: string;
  action?: MarkdownAction;
};

export type WelcomeData = {
  highlights: Highlight[];
};

export const isMarkdownAction = (data: unknown): data is MarkdownAction => {
  if (typeof data !== "object" || data === null) return false;
  if (Array.isArray(data)) return false;

  if (
    !("type" in data)
    || typeof data.type !== "string"
    || data.type !== "markdown"
  )
    return false;
  if (!("label" in data) || typeof data.label !== "string") return false;
  if (!("path" in data) || typeof data.path !== "string") return false;

  return true;
};

export const isHighlight = (data: unknown): data is Highlight => {
  if (typeof data !== "object" || data === null) return false;
  if (Array.isArray(data)) return false;

  if (!("title" in data) || typeof data.title !== "string") return false;
  if ("description" in data && typeof data.description !== "string")
    return false;
  if ("image" in data && typeof data.image !== "string") return false;
  if ("action" in data && !isMarkdownAction(data.action)) return false;

  return true;
};

export const isHighlights = (data: unknown): data is Highlight[] => {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true;

  return data.every(item => isHighlight(item));
};

export const isWelcomeData = (data: unknown): data is WelcomeData => {
  if (typeof data !== "object" || data === null) return false;
  if (Array.isArray(data)) return false;

  if (!("highlights" in data) || !isHighlights(data.highlights)) return false;

  return true;
};
