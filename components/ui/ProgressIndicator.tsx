import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ProgressIndicatorProps {
  progress?: number; // 0 to 100, if omitted, renders indeterminate
  className?: string;
  label?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  className,
  label,
}) => {
  const isDeterminate = typeof progress === "number";

  return (
    <div className={cn("w-full space-y-1.5 select-none", className)}>
      {label && (
        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-neutral-400">
          <span>{label}</span>
          {isDeterminate && <span>{Math.round(progress)}%</span>}
        </div>
      )}
      <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden relative">
        {isDeterminate ? (
          <div
            className="h-full bg-cyan-400 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        ) : (
          <div className="h-full bg-cyan-400 w-1/3 animate-indeterminate rounded-full" />
        )}
      </div>
    </div>
  );
};
