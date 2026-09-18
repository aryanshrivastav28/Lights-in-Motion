import React from "react";
import { cn } from "@/lib/utils/cn";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      variant = "ghost",
      size = "md",
      "aria-label": ariaLabel,
      type = "button",
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: "bg-white text-neutral-950 hover:bg-neutral-200 active:bg-neutral-300",
      secondary: "bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/25 active:bg-white/[0.12] border border-white/10 backdrop-blur-sm",
      accent: "border border-cyan-400/80 text-cyan-400 hover:bg-cyan-400/10 active:bg-cyan-400/20 bg-transparent",
      outline: "border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.04] active:bg-white/[0.08]",
      ghost: "text-neutral-400 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.1]",
    };

    const sizeClasses = {
      sm: "w-8 h-8 rounded-sm text-xs",
      md: "w-10 h-10 rounded-sm text-sm",
      lg: "w-12 h-12 rounded-sm text-base",
    };

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center transition-colors duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed select-none",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
