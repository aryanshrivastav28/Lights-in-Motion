"use client";

import React, { useRef } from "react";
import { EnvironmentMode, ENVIRONMENT_DATA } from "./ExperienceContent";
import { cn } from "@/lib/utils/cn";

export interface ExperienceSelectorProps {
  activeEnvironment: EnvironmentMode;
  onSelect: (env: EnvironmentMode) => void;
  className?: string;
}

const MODES: EnvironmentMode[] = ["gaming", "cinema", "desk"];

export const ExperienceSelector: React.FC<ExperienceSelectorProps> = ({
  activeEnvironment,
  onSelect,
  className,
}) => {
  const tabRefs = useRef<Map<EnvironmentMode, HTMLButtonElement>>(new Map());

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentMode: EnvironmentMode
  ) => {
    const currentIndex = MODES.indexOf(currentMode);
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % MODES.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + MODES.length) % MODES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = MODES.length - 1;
    } else {
      return;
    }

    const nextMode = MODES[nextIndex];
    onSelect(nextMode);
    tabRefs.current.get(nextMode)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Experience Environment Mode Selector"
      className={cn(
        "flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1 rounded-sm bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm select-none max-w-xl w-full",
        className
      )}
    >
      {MODES.map((mode) => {
        const item = ENVIRONMENT_DATA[mode];
        const isActive = activeEnvironment === mode;

        return (
          <button
            key={mode}
            ref={(el) => {
              if (el) tabRefs.current.set(mode, el);
              else tabRefs.current.delete(mode);
            }}
            id={`experience-tab-${mode}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`experience-panel-${mode}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(mode)}
            onKeyDown={(e) => handleKeyDown(e, mode)}
            className={cn(
              "flex-1 flex items-center justify-between sm:justify-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-sm transition-all duration-200 text-xs font-mono tracking-[0.14em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer",
              isActive
                ? "bg-white/[0.09] text-white border border-white/20 shadow-sm"
                : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-[10px] font-mono",
                  isActive ? "text-cyan-400 font-semibold" : "text-neutral-500"
                )}
              >
                {item.index}
              </span>
              <span className="font-medium whitespace-nowrap">{item.label}</span>
            </div>

            {/* Active micro-indicator dot */}
            {isActive ? (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] shrink-0" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
};
