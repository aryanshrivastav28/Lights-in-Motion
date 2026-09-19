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
        "bg-[#111214] text-[#FAF9F6] font-semibold hover:bg-[#25282C] active:bg-[#34383D] border border-[#111214]",
      secondary:
        "bg-[rgba(17,18,20,0.05)] text-[#111214] hover:bg-[rgba(17,18,20,0.08)] hover:border-[rgba(17,18,20,0.2)] active:bg-[rgba(17,18,20,0.12)] border border-[rgba(17,18,20,0.12)] backdrop-blur-sm",
      accent:
        "border border-[#1687FF] text-[#1687FF] hover:bg-[#1687FF]/10 active:bg-[#1687FF]/20 bg-transparent",
      outline:
        "border border-[rgba(17,18,20,0.15)] text-[#111214] hover:border-[rgba(17,18,20,0.3)] hover:bg-[rgba(17,18,20,0.03)] active:bg-[rgba(17,18,20,0.06)]",
      ghost:
        "text-[#55575A] hover:text-[#111214] hover:bg-[rgba(17,18,20,0.05)] active:bg-[rgba(17,18,20,0.08)] border border-transparent",
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
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]",
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
