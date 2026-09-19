"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { UserIcon } from "@/components/ui/Icons";

export interface AccountTriggerProps {
  isLoggedIn?: boolean;
  userName?: string;
  onClick?: () => void;
  className?: string;
  light?: boolean;
}

export const AccountTrigger: React.FC<AccountTriggerProps> = ({
  isLoggedIn = false,
  userName,
  onClick,
  className,
  light = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLoggedIn ? `Account: ${userName || "User"}` : "Account Sign In"}
      className={cn(
        "group inline-flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors duration-150 cursor-pointer select-none",
        light
          ? "text-[#111214] hover:text-[#1687FF] hover:bg-[rgba(17,18,20,0.04)]"
          : "text-neutral-400 hover:text-white hover:bg-white/[0.04]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF]",
        className
      )}
    >
      <UserIcon
        size={16}
        className={cn(
          "transition-colors",
          isLoggedIn
            ? "text-[#1687FF]"
            : light
            ? "text-[#111214] group-hover:text-[#1687FF]"
            : "group-hover:text-white"
        )}
      />
      <span className="text-xs font-mono tracking-[0.18em] uppercase font-medium">
        {isLoggedIn ? userName || "PROFILE" : "ACCOUNT"}
      </span>
      {isLoggedIn && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#1687FF] shadow-[0_0_6px_rgba(22,135,255,0.7)]" />
      )}
    </button>
  );
};
