import { useCallback, useState } from "react";

import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Image } from "../Image";

export type ImageDialogProps = {
  alt?: string;
  src: string;
  title?: string;
};

export const ImageDialog = ({ alt, src, title }: ImageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleImageDialogClick = useCallback(() => {
    setIsOpen(previousIsOpen => !previousIsOpen);
  }, []);
  const closeImageDialog = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <>
      <Button
        className="m-0 inline w-full cursor-pointer b-0 bg-transparent p-0"
        onClick={handleImageDialogClick}
      >
        <Image
          alt={alt}
          className="block h-full w-full object-scale-down"
          src={src}
          title={title}
        />
      </Button>
      {isOpen && (
        <Dialog
          extendedClassName="w-full lg:w-80% xl:w-70% 2xl:w-60%"
          onClose={closeImageDialog}
          title={alt}
          variant="accent"
        >
          <figure>
            <Image
              alt={alt}
              className="block h-full w-full object-scale-down"
              src={src}
              title={title}
            />
            <figcaption className="block text-center text-size-lg">
              {title}
            </figcaption>
          </figure>
        </Dialog>
      )}
    </>
  );
};
