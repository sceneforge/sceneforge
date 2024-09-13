const SITEMAP_DIST_PATH = "apps/sceneforge/dist/sitemap.xml";

type XmlAttributes = {
  encoding?: string;
  version?: string;
};

type SitemapUrlProps = {
  changeFrequency?: "always" | "daily" | "hourly" | "monthly" | "never" | "weekly" | "yearly";
  lastModified?: Date | number | string;
  location: string;
  priority?: number;
};

const tag = (
  name: string,
  attributes?: ({
    children?: (null | string | undefined)[] | null | string;
  } & Record<
    string,
    (null | string | undefined)[] | null | string | undefined
  >) | null,
  children?: (null | string | undefined)[] | null | string
) => {
  const tagAttributes = attributes
    ? Object
      .entries(attributes)
      .filter(([key, value]) => key !== "children" && value !== undefined)
      .map(([key, value]) => {
        if (value === undefined || value === null) return;
        const attributeValue = Array.isArray(value) ? value.join(" ") : value;
        return ` ${key}="${attributeValue.replaceAll("\"", "&quot;")}"`;
      })
      .filter(Boolean)
      .join("")
    : "";

  const tagChildren = !children && attributes && "children" in attributes ? attributes.children : children;
  const openTag = `<${name}${tagAttributes}>`;
  const closeTag = `</${name}>`;

  const childrenString = Array.isArray(tagChildren)
    ? tagChildren.filter(Boolean).join("\n")
    : tagChildren ?? "";

  const childrenLines = childrenString.split("\n");

  return [
    openTag,
    childrenLines.length < 2 && !tagAttributes
      ? childrenLines.join("")
      : childrenLines
        .map(child => `  ${child}`)
        .join("\n"),
    closeTag,
  ].filter(Boolean).join(childrenLines.length > 1 ? "\n" : "");
};

const xml = (children?: string | string[], attributes?: XmlAttributes) => {
  const version = attributes?.version ?? "1.0";
  // eslint-disable-next-line unicorn/text-encoding-identifier-case
  const encoding = attributes?.encoding ?? "UTF-8";
  return [
    `<?xml version="${version}" encoding="${encoding}"?>`,
    ...(Array.isArray(children) ? children : [children]),
  ].join("\n");
};

const parseDate = (date?: Date | number | string) => {
  if (!date) {
    return;
  }

  const parsedDate = new Date(date);
  const year = parsedDate.getUTCFullYear();
  const month = parsedDate.getUTCMonth() + 1;
  const day = parsedDate.getUTCDate();

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return;
  }

  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};

const buildUrl = ({
  changeFrequency,
  lastModified,
  location,
  priority,
}: SitemapUrlProps) => {
  const parsedLastModified = parseDate(lastModified);

  return tag("url", null, [
    tag("loc", null, location),
    changeFrequency ? tag("changefreq", null, changeFrequency) : null,
    parsedLastModified ? tag("lastmod", null, parsedLastModified) : null,
    priority ? tag("priority", null, priority?.toPrecision(2)) : null,
  ]);
};

export const buildAppSitemap = async () => {
  return await Bun.write(
    SITEMAP_DIST_PATH,
    xml(tag("urlset", {
      xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
    }, [
      buildUrl({
        lastModified: Date.now(),
        location: "https://app.sceneforge.com/",
      }),
    ]))
  );
};
