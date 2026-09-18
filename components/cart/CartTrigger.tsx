"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { CartIcon } from "@/components/ui/Icons";

export interface CartTriggerProps {
  itemCount?: number;
  onClick?: () => void;
  className?: string;
}

export const CartTrigger: React.FC<CartTriggerProps> = ({
  itemCount = 0,
  onClick,
  className,
}) => {
  const formattedCount =
    itemCount > 0 ? (itemCount < 10 ? `0${itemCount}` : `${itemCount}`) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Cart, ${itemCount} items`}
      className={cn(
        "group inline-flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors duration-150 cursor-pointer select-none",
        "text-neutral-400 hover:text-white hover:bg-white/[0.04]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        className
      )}
    >
      <CartIcon
        size={16}
        className="transition-colors group-hover:text-cyan-400"
      />
      <span className="text-xs font-mono tracking-[0.18em] uppercase font-medium">
        CART
      </span>
      {formattedCount && (
        <span className="text-[11px] font-mono font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-1.5 py-0.5 rounded-sm">
          {formattedCount}
        </span>
      )}
    </button>
  );
};
