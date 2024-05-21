import { useCallback, useState } from "react";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Image } from "../Image";

export type ImageDialogProps = {
  src: string;
  title?: string;
  alt?: string;
};

export const ImageDialog = ({ src, title, alt }: ImageDialogProps) => {
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
          src={src}
          title={title}
          alt={alt}
          className="block h-full w-full object-scale-down"
        />
      </Button>
      {isOpen && (
        <Dialog
          variant="accent"
          title={alt}
          onClose={closeImageDialog}
          extendedClassName="w-full lg:w-80% xl:w-70% 2xl:w-60%"
        >
          <figure>
            <Image
              src={src}
              title={title}
              alt={alt}
              className="block h-full w-full object-scale-down"
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
