import { Button } from "../Button";
import { IconButton } from "../IconButton";

export interface TabItemProps {
  title: string;
  active?: boolean;
  index?: number;
  onCloseClick?: () => void;
  onActiveClick?: () => void;
}

export const TabItem = ({
  title,
  onCloseClick,
  onActiveClick,
  active,
  index,
}: TabItemProps) => {
  return (
    <li className="relative min-w-24 max-w-80 overflow-clip text-light">
      <div className="w-full h-full flex flex-row justify-stretch items-center">
        <Button
          className="c-light b-none b-0 flex-grow p-block-3 p-inline-2 text-start w-full h-full rounded-bl-2 bg-transparent siblings:bg-transparent siblings:c-transparent aria-selected:bg-accent:65 siblings:aria-selected:bg-accent:65 siblings:aria-selected:c-light:25 siblings:hover:c-light:50"
          aria-controls={`tabpanel-${index}`}
          aria-label={title}
          aria-selected={active ? "true" : "false"}
          role="tab"
          tabIndex={active ? -1 : 0}
          title={title}
          onClick={onActiveClick}
        >
          {title}
        </Button>
        <IconButton
          className="b-none b-0 flex-shrink p-block-3 p-inline-2 h-full rounded-br-2 hover:c-light:100 cursor-pointer"
          icon="close"
          label="close"
          tabIndex={-1}
          onClick={onCloseClick}
        />
      </div>
    </li>
  );
};
