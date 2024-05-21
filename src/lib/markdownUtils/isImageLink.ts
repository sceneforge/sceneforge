export type ImageChildren = {
  props: {
    alt?: string;
    node: {
      tagName: "img";
    };
    src: string;
    title?: string;
  };
};

export const isImageLink = (
  children: unknown,
  href?: string
): children is ImageChildren => {
  if (
    href
    && children
    && typeof children === "object"
    && children !== null
    && !Array.isArray(children)
    && "props" in children
    && typeof children.props === "object"
    && children.props !== null
    && !Array.isArray(children.props)
    && "node" in children.props
    && "src" in children.props
    && typeof children.props.src === "string"
    && typeof children.props.node === "object"
    && children.props.node !== null
    && !Array.isArray(children.props.node)
    && "tagName" in children.props.node
    && children.props.node.tagName === "img"
    && children.props.src === href
  ) {
    return true;
  }
  return false;
};
