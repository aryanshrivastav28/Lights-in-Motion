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
        "w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-sm bg-[#FAF9F6] border border-[rgba(17,18,20,0.10)] backdrop-blur-sm select-none shadow-sm",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-3 border-b border-[rgba(17,18,20,0.10)] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1687FF] shadow-[0_0_6px_rgba(22,135,255,0.5)]" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-[#1687FF] uppercase font-semibold">
            ENVIRONMENT TELEMETRY {"//"} {current.shortName}
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.18em] text-[#6B6D70] uppercase">
          {current.badge}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {current.telemetry.map((item, idx) => (
          <div
            key={item.label}
            className={cn(
              "flex flex-col space-y-0.5",
              idx > 0 && "md:border-l md:border-[rgba(17,18,20,0.10)] md:pl-4 lg:pl-6"
            )}
          >
            <span className="text-[9px] font-mono tracking-[0.18em] text-[#6B6D70] uppercase font-medium">
              {item.label}
            </span>
            <span className="text-[10px] sm:text-[11px] xl:text-xs font-mono font-medium tracking-wider uppercase text-[#111214] whitespace-nowrap">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
