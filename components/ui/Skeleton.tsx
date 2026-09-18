import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: "none" | "sm" | "md" | "full";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  rounded = "sm",
  ...props
}) => {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-surface-hover/80 border border-surface-border/40",
        roundedClasses[rounded],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
};
