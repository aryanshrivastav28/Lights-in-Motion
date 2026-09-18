import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  bleed?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = "lg",
  bleed = false,
  ...props
}) => {
  const spacingClasses = {
    none: "py-0",
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-24",
    xl: "py-24 sm:py-32 lg:py-40",
  };

  return (
    <section
      className={cn(
        "relative w-full",
        spacingClasses[spacing],
        !bleed && "overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
