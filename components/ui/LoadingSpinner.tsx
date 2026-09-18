import React from "react";
import { cn } from "@/lib/utils/cn";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: "accent" | "white" | "muted" | "dark";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
  color = "accent",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-8 h-8 border-[2.5px]",
  };

  const colorClasses = {
    accent: "border-cyan-400/20 border-t-cyan-400",
    white: "border-white/20 border-t-white",
    muted: "border-white/10 border-t-neutral-400",
    dark: "border-neutral-950/20 border-t-neutral-950",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block rounded-full animate-spin shrink-0",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
