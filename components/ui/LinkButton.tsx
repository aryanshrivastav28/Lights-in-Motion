import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ArrowRightIcon } from "./Icons";

export interface LinkButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  variant?: "standard" | "navigation" | "technical" | "arrow";
  active?: boolean;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  onClick,
  children,
  variant = "standard",
  active = false,
  className,
  external = false,
  disabled = false,
  "aria-label": ariaLabel,
}) => {
  const baseClasses =
    "inline-flex items-center transition-colors duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950";

  const variantClasses = {
    standard:
      "text-neutral-300 hover:text-white underline-offset-4 hover:underline decoration-white/30 text-sm font-normal",
    navigation: cn(
      "text-xs tracking-[0.18em] uppercase transition-colors duration-150 py-1 font-medium",
      active
        ? "text-white border-b border-cyan-400"
        : "text-neutral-400 hover:text-white"
    ),
    technical: cn(
      "font-mono text-xs tracking-wider uppercase inline-flex items-center gap-2",
      active ? "text-cyan-400" : "text-neutral-400 hover:text-neutral-200"
    ),
    arrow:
      "group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white hover:text-cyan-400 transition-colors",
  };

  const content = (
    <>
      {variant === "technical" && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-colors",
            active ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.6)]" : "bg-neutral-600 group-hover:bg-neutral-400"
          )}
        />
      )}
      <span>{children}</span>
      {variant === "arrow" && (
        <ArrowRightIcon
          size={14}
          strokeWidth={2}
          className="transition-transform duration-150 ease-out group-hover:translate-x-1 shrink-0"
        />
      )}
    </>
  );

  const combinedClass = cn(
    baseClasses,
    variantClasses[variant],
    disabled && "opacity-30 cursor-not-allowed pointer-events-none",
    className
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={combinedClass}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={combinedClass}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={combinedClass}
    >
      {content}
    </button>
  );
};
