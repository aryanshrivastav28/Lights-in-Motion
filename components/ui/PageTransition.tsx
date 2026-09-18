import React from "react";
import { cn } from "@/lib/utils/cn";

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "animate-in fade-in duration-300 motion-reduce:animate-none",
        className
      )}
    >
      {children}
    </div>
  );
};
