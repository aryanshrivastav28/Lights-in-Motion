import React from "react";
import { cn } from "@/lib/utils/cn";
import { LoadingSpinner } from "./LoadingSpinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        "bg-white text-neutral-950 font-semibold hover:bg-neutral-200 active:bg-neutral-300 border border-white",
      secondary:
        "bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/25 active:bg-white/[0.12] border border-white/10 backdrop-blur-sm",
      accent:
        "border border-cyan-400/80 text-cyan-400 hover:bg-cyan-400/10 active:bg-cyan-400/20 bg-transparent",
      outline:
        "border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.03] active:bg-white/[0.06]",
      ghost:
        "text-neutral-300 hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] border border-transparent",
    };

    const sizeClasses = {
      sm: "text-xs px-3.5 py-1.5 rounded-sm gap-1.5 tracking-wider uppercase font-medium min-h-[32px]",
      md: "text-xs px-5 py-2.5 rounded-sm gap-2 tracking-[0.14em] uppercase font-medium min-h-[42px]",
      lg: "text-sm px-7 py-3.5 rounded-sm gap-2.5 tracking-[0.16em] uppercase font-semibold min-h-[50px]",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center transition-colors duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed select-none",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <LoadingSpinner
            size="sm"
            color={variant === "primary" ? "dark" : "accent"}
            className="shrink-0"
          />
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
