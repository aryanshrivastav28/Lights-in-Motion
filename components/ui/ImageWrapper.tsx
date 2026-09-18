import React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";

export interface ImageWrapperProps extends Omit<ImageProps, "className"> {
  wrapperClassName?: string;
  imageClassName?: string;
  aspectRatio?: "square" | "video" | "cinema" | "portrait";
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  wrapperClassName,
  imageClassName,
  aspectRatio = "video",
  ...props
}) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    cinema: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-solid rounded-sm",
        aspectClasses[aspectRatio],
        wrapperClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("object-cover transition-opacity duration-300", imageClassName)}
        {...props}
      />
    </div>
  );
};
