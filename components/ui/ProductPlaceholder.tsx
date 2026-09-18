import React from "react";
import { cn } from "@/lib/utils/cn";
import { Box, Sparkles } from "lucide-react";

export interface ProductPlaceholderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ProductPlaceholder: React.FC<ProductPlaceholderProps> = ({
  title = "LIGHT IN MOTION PRODUCT",
  subtitle = "HARDWARE STAGE",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full aspect-[16/10] glass-panel rounded-md flex flex-col items-center justify-center p-8 overflow-hidden group border border-surface-border hover:border-surface-border-highlight transition-all duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-radial-glow from-accent/10 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      <div className="absolute top-4 left-4 font-mono text-[10px] text-foreground-dim uppercase tracking-widest">
        STAGE // 01
      </div>
      <div className="absolute top-4 right-4 font-mono text-[10px] text-foreground-dim uppercase tracking-widest">
        FOV 360 DEG
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-foreground-dim uppercase tracking-widest flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-accent" />
        <span>AMBIENT RGB ACTIVE</span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center border border-surface-border mb-4 text-accent group-hover:scale-105 transition-transform duration-300">
          <Box className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold uppercase tracking-wider text-foreground">
          {title}
        </h4>
        <p className="text-xs font-mono uppercase tracking-widest text-foreground-dim mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
