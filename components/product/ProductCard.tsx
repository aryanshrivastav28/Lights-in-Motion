import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils/formatters";
import { ArrowRightIcon } from "@/components/ui/Icons";

export interface ProductCardProps {
  id: string;
  title: string;
  descriptor: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  availability?: "in_stock" | "low_stock" | "pre_order";
  imageUrl?: string;
  href?: string;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  descriptor,
  price,
  compareAtPrice,
  badge,
  availability = "in_stock",
  imageUrl,
  href = "/store",
  onAction,
  actionLabel = "EXPLORE",
  className,
}) => {
  const availabilityLabels = {
    in_stock: { text: "IN STOCK", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    low_stock: { text: "LOW STOCK", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    pre_order: { text: "PRE-ORDER", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" },
  };

  const status = availabilityLabels[availability];

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors duration-200 rounded-sm p-5 select-none",
        className
      )}
    >
      {/* Visual Header / Badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {badge ? (
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-sm bg-white/[0.06] border border-white/10 text-neutral-300 font-medium">
            {badge}
          </span>
        ) : (
          <span />
        )}
        <span
          className={cn(
            "text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm border font-medium",
            status.color
          )}
        >
          {status.text}
        </span>
      </div>

      {/* Dominant Product Image Container */}
      <div className="relative w-full aspect-[4/3] bg-neutral-900/60 border border-white/[0.04] rounded-sm overflow-hidden flex items-center justify-center mb-5 group-hover:border-white/10 transition-colors">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* Technical Hardware Silhouette Placeholder */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Ambient backlight glow simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/[0.06] to-transparent pointer-events-none" />
            <div className="w-24 h-16 rounded-sm border border-cyan-400/30 bg-neutral-950/80 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400/90 font-semibold">
                4K // SYNC
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-3">
              REF // {id.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-1.5 mb-5 flex-1">
        <h3 className="text-base font-semibold tracking-wide text-white group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-neutral-400 font-mono tracking-wide line-clamp-2">
          {descriptor}
        </p>
      </div>

      {/* Price & Action Row */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            PRICE
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-mono font-semibold text-white">
              {formatINR(price)}
            </span>
            {compareAtPrice && compareAtPrice > price && (
              <span className="text-xs font-mono text-neutral-500 line-through">
                {formatINR(compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {onAction ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={onAction}
            className="shrink-0"
          >
            <span>{actionLabel}</span>
            <ArrowRightIcon size={14} className="ml-1.5" />
          </Button>
        ) : (
          <Link href={href}>
            <Button variant="secondary" size="sm" className="shrink-0">
              <span>{actionLabel}</span>
              <ArrowRightIcon size={14} className="ml-1.5" />
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
};
