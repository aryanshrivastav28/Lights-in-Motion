import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";
import { ArrowRightIcon } from "./Icons";

export interface NotFoundStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({
  title = "404 // ROUTE NOT FOUND",
  message = "The requested coordinate does not exist in the Light in Motion system directory.",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-12 sm:p-20 border border-white/[0.08] bg-white/[0.01] rounded-sm space-y-6 max-w-lg mx-auto select-none",
        className
      )}
    >
      <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
      <div className="space-y-2">
        <h1 className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-white font-semibold">
          {title}
        </h1>
        <p className="text-xs text-neutral-400 font-sans max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/">
          <Button variant="primary" size="sm">
            <span>RETURN HOME</span>
            <ArrowRightIcon size={14} className="ml-1.5" />
          </Button>
        </Link>
        <Link href="/store">
          <Button variant="secondary" size="sm">
            <span>EXPLORE STORE</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
