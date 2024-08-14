import type { HotspotData } from "@sceneforge/data";

export type HotspotDetailsProps = HotspotData;

const HotspotDetails = ({
  createdAt,
  description,
  distance,
  label,
  updatedAt,
  url,
}: HotspotDetailsProps) => {
  return (
    <>
      <ul>
        <li>
          <p>
            <strong>Label: </strong>
            {label}
          </p>
        </li>
        {description && (
          <li>
            <p>
              <strong>Description: </strong>
              {description}
            </p>
          </li>
        )}
        {url && typeof url === "string" && (
          <li>
            <p>
              <strong>URL: </strong>
              <a href={url} rel="external" target="_blank">{url}</a>
            </p>
          </li>
        )}
        {distance && (
          <li>
            <p>
              <strong>Distance: </strong>
              {distance}
            </p>
          </li>
        )}
        {createdAt && createdAt instanceof Date && (
          <li>
            <p>
              <strong>Created At: </strong>
              {createdAt.toISOString()}
            </p>
          </li>
        )}
        {updatedAt && updatedAt instanceof Date && (
          <li>
            <p>
              <strong>Updated At: </strong>
              {updatedAt.toISOString()}
            </p>
          </li>
        )}
      </ul>
      <hr />
    </>
  );
};

export default HotspotDetails;
