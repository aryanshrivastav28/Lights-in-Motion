import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "cinema" | "full";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = "default",
  ...props
}) => {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
    cinema: "max-w-[1536px]",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
