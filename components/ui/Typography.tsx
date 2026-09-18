import React from "react";
import { cn } from "@/lib/utils/cn";

export interface DisplayHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2";
}

export const DisplayHeading: React.FC<DisplayHeadingProps> = ({
  as: Component = "h1",
  children,
  className,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase text-foreground leading-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = "h2",
  size,
  children,
  className,
  ...props
}) => {
  const targetSize = size || Component;

  const sizeClasses = {
    h1: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground",
    h2: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground",
    h3: "text-xl sm:text-2xl font-semibold tracking-tight text-foreground",
    h4: "text-lg sm:text-xl font-semibold text-foreground",
    h5: "text-base font-semibold text-foreground",
    h6: "text-sm font-semibold uppercase tracking-wider text-foreground-muted",
  };

  return (
    <Component className={cn(sizeClasses[targetSize], className)} {...props}>
      {children}
    </Component>
  );
};

export interface BodyProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "lg";
  dim?: boolean;
}

export const Body: React.FC<BodyProps> = ({
  size = "base",
  dim = false,
  children,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "text-xs sm:text-sm leading-relaxed",
    base: "text-sm sm:text-base leading-relaxed",
    lg: "text-base sm:text-lg leading-relaxed",
  };

  return (
    <p
      className={cn(
        sizeClasses[size],
        dim ? "text-foreground-dim" : "text-foreground-muted",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export interface TechMonoProps extends React.HTMLAttributes<HTMLSpanElement> {
  accent?: boolean;
}

export const TechMono: React.FC<TechMonoProps> = ({
  accent = false,
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "font-mono text-xs sm:text-sm tracking-wider uppercase",
        accent ? "text-accent" : "text-foreground-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  accent?: boolean;
}

export const Caption: React.FC<CaptionProps> = ({
  accent = false,
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "text-[10px] sm:text-xs font-semibold uppercase tracking-widest",
        accent ? "text-accent" : "text-foreground-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
