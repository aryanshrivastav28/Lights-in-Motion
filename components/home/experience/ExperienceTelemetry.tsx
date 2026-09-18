import React from "react";
import { EnvironmentMode, ENVIRONMENT_DATA } from "./ExperienceContent";
import { cn } from "@/lib/utils/cn";

export interface ExperienceTelemetryProps {
  activeEnvironment: EnvironmentMode;
  className?: string;
}

export const ExperienceTelemetry: React.FC<ExperienceTelemetryProps> = ({
  activeEnvironment,
  className,
}) => {
  const current = ENVIRONMENT_DATA[activeEnvironment];

  return (
    <div
      className={cn(
        "w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-sm bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-3 border-b border-white/[0.06] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase font-medium">
            ENVIRONMENT TELEMETRY {"//"} {current.shortName}
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.18em] text-neutral-400 uppercase">
          {current.badge}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {current.telemetry.map((item, idx) => (
          <div
            key={item.label}
            className={cn(
              "flex flex-col space-y-0.5",
              idx > 0 && "md:border-l md:border-white/[0.06] md:pl-4 lg:pl-6"
            )}
          >
            <span className="text-[9px] font-mono tracking-[0.18em] text-neutral-400 uppercase">
              {item.label}
            </span>
            <span className="text-[10px] sm:text-[11px] xl:text-xs font-mono font-medium tracking-wider uppercase text-white whitespace-nowrap">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
