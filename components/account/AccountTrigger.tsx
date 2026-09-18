"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { UserIcon } from "@/components/ui/Icons";

export interface AccountTriggerProps {
  isLoggedIn?: boolean;
  userName?: string;
  onClick?: () => void;
  className?: string;
}

export const AccountTrigger: React.FC<AccountTriggerProps> = ({
  isLoggedIn = false,
  userName,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLoggedIn ? `Account: ${userName || "User"}` : "Account Sign In"}
      className={cn(
        "group inline-flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors duration-150 cursor-pointer select-none",
        "text-neutral-400 hover:text-white hover:bg-white/[0.04]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        className
      )}
    >
      <UserIcon
        size={16}
        className={cn(
          "transition-colors",
          isLoggedIn ? "text-cyan-400" : "group-hover:text-white"
        )}
      />
      <span className="text-xs font-mono tracking-[0.18em] uppercase font-medium">
        {isLoggedIn ? userName || "PROFILE" : "ACCOUNT"}
      </span>
      {isLoggedIn && (
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
      )}
    </button>
  );
};
