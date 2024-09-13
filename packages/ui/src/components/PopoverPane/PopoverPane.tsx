import { Align, IconEnum, Shape } from "../../types";
import { Pane, type PaneProps } from "../Pane";
import { Popover, type PopoverProps } from "../Popover";
import { usePopoverPane } from "./usePopoverPane";

export type PopoverPaneProps = {
  headingPadding?: PaneProps["headingPadding"];
  headingStyle?: PaneProps["headingStyle"];
  image?: PaneProps["image"];
  imageAlt?: PaneProps["imageAlt"];
  imageStyle?: PaneProps["imageStyle"];
  level?: PaneProps["level"];
  onTitleChange?: PaneProps["onTitleChange"];
  paneActions?: PaneProps["paneActions"];
  paneActionsDense?: PaneProps["paneActionsDense"];
  paneActionsGap?: PaneProps["paneActionsGap"];
  paneActionsHidden?: PaneProps["paneActionsHidden"];
  paneActionsMargin?: PaneProps["paneActionsMargin"];
  paneActionsPadding?: PaneProps["paneActionsPadding"];
  paneActionsScale?: PaneProps["paneActionsScale"];
  paneActionsStyle?: PaneProps["paneActionsStyle"];
  title?: PaneProps["title"];
  titleEditable?: PaneProps["titleEditable"];
} & Omit<PopoverProps, "style">;

const PopoverPane = ({
  align = Align.Center,
  children,
  headingPadding,
  headingStyle,
  image,
  imageAlt,
  imageStyle,
  level = 3,
  onTitleChange,
  paneActions,
  paneActionsDense,
  paneActionsGap,
  paneActionsHidden,
  paneActionsMargin,
  paneActionsPadding,
  paneActionsScale,
  paneActionsStyle,
  ref,
  title,
  titleEditable,
  variant,
  verticalAlign = Align.Start,
  ...props
}: PopoverPaneProps) => {
  const {
    closePopoverPane,
    popoverRef,
    // eslint-disable-next-line react-compiler/react-compiler
  } = usePopoverPane({ ref });

  return (
    <Popover
      {...props}
      align={align}
      ref={popoverRef}
      shape={Shape.Rounded}
      variant={variant}
      verticalAlign={verticalAlign}
    >
      <Pane
        actions={[
          {
            dense: true,
            icon: IconEnum.Close,
            kind: "icon",
            label: "Close",
            onClick: closePopoverPane,
            scale: false,
          },
        ]}
        headingPadding={headingPadding}
        headingStyle={headingStyle}
        image={image}
        imageAlt={imageAlt}
        imageStyle={imageStyle}
        level={level}
        onTitleChange={onTitleChange}
        outer
        paneActions={paneActions}
        paneActionsDense={paneActionsDense}
        paneActionsGap={paneActionsGap}
        paneActionsHidden={paneActionsHidden}
        paneActionsMargin={paneActionsMargin}
        paneActionsPadding={paneActionsPadding}
        paneActionsScale={paneActionsScale}
        paneActionsStyle={paneActionsStyle}
        title={title}
        titleEditable={titleEditable}
      >
        {children}
      </Pane>
    </Popover>
  );
};

export default PopoverPane;
