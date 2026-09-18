import React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  compact?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "SYSTEM COMMUNICATION ERROR",
  message = "An unexpected error interrupted this telemetry channel. Please retry your request.",
  onRetry,
  className,
  compact = false,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center text-center border border-red-500/20 bg-red-500/[0.02] rounded-sm select-none",
        compact ? "p-4 space-y-2" : "p-8 sm:p-12 space-y-4 max-w-md mx-auto",
        className
      )}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
      <div className="space-y-1">
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
          {title}
        </h3>
        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2">
          RETRY CONNECTION
        </Button>
      )}
    </div>
  );
};
