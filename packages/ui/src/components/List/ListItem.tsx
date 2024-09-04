import { UnlistedItem, type UnlistedItemProps } from "../Unlisted";

export type ListItemProps = UnlistedItemProps;

const ListItem = ({ ...props }: ListItemProps) => {
  return <UnlistedItem {...props} />;
};

export default ListItem;
