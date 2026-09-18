import React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "NO TELEMETRY RECORDED",
  description = "No items match your active query or configuration parameters.",
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-white/[0.06] bg-white/[0.01] rounded-sm space-y-4 max-w-md mx-auto select-none",
        className
      )}
    >
      {icon && (
        <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
          {title}
        </h3>
        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
