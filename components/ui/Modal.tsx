"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { CloseIcon } from "./Icons";
import { IconButton } from "./IconButton";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
      aria-label={title || "Dialog"}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-lg bg-neutral-950/95 border border-white/10 rounded-sm shadow-2xl z-10 overflow-hidden",
          "animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div>
            {title && (
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[11px] text-neutral-400 mt-0.5 tracking-wider font-mono">
                {subtitle}
              </p>
            )}
          </div>
          <IconButton
            aria-label="Close dialog"
            size="sm"
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <CloseIcon size={18} />
          </IconButton>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
};
