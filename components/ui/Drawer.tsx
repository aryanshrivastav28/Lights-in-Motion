"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { CloseIcon } from "./Icons";
import { IconButton } from "./IconButton";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "right" | "left";
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = "right",
  title,
  subtitle,
  children,
  footer,
  className,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Panel"}
      className="fixed inset-0 z-50 flex overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div
        ref={drawerRef}
        className={cn(
          "relative h-full w-full sm:max-w-md md:max-w-[460px] bg-neutral-950/95 sm:backdrop-blur-md flex flex-col z-10 shadow-2xl transition-all duration-300 ease-out border-white/10",
          position === "right" ? "ml-auto border-l animate-in slide-in-from-right" : "mr-auto border-r animate-in slide-in-from-left",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] shrink-0">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
              {title || "PANEL"}
            </h2>
            {subtitle && (
              <p className="text-[11px] text-neutral-400 mt-0.5 tracking-wider font-mono">
                {subtitle}
              </p>
            )}
          </div>
          <IconButton
            aria-label="Close drawer"
            size="sm"
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <CloseIcon size={18} />
          </IconButton>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">{children}</div>

        {/* Optional Footer */}
        {footer && (
          <div className="p-6 border-t border-white/[0.08] bg-white/[0.02] shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
