import React from "react";
import Link from "next/link";
import { getProducts } from "@/lib/actions/product-actions";
import { formatINR } from "@/lib/utils/formatters";
import { ArrowRightIcon, HardwareIcon, ExternalLinkIcon } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const result = await getProducts();
  const products = result.success && result.data ? result.data : [];

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.active).length;
  const totalStock = products.reduce((acc, p) => {
    const variantStock = p.variants.reduce((vAcc, v) => vAcc + v.stockQuantity, 0);
    return acc + variantStock;
  }, 0);

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
              DATABASE: SUPABASE POSTGRES // CONNECTED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
            Store Terminal Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Control plane for products, video assets, pricing tiers, and stock management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center px-4 py-2 rounded-sm bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-mono tracking-widest uppercase font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <span>+ Add Product</span>
          </Link>
          <Link
            href="/store"
            target="_blank"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-sm bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <span>Live Store</span>
            <ExternalLinkIcon size={12} />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-sm bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            Total Hardware Models
          </span>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-3xl font-bold font-mono text-white">
              {totalProducts}
            </span>
            <span className="text-xs font-mono text-neutral-500">catalog items</span>
          </div>
        </div>

        <div className="p-5 rounded-sm bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            Active Storefront Items
          </span>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-3xl font-bold font-mono text-cyan-400">
              {activeProducts}
            </span>
            <span className="text-xs font-mono text-neutral-500">visible to buyers</span>
          </div>
        </div>

        <div className="p-5 rounded-sm bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            Available Inventory
          </span>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-3xl font-bold font-mono text-emerald-400">
              {totalStock}
            </span>
            <span className="text-xs font-mono text-neutral-500">units in warehouse</span>
          </div>
        </div>
      </div>

      {/* Recent Catalog Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono tracking-[0.16em] uppercase text-neutral-300">
            Catalog Hardware ({totalProducts})
          </h2>
          <Link
            href="/admin/products"
            className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRightIcon size={12} />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-sm border border-dashed border-white/10 bg-white/[0.01]">
            <p className="text-sm font-mono text-neutral-400 mb-2">
              No products in database yet.
            </p>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
              Create your first ambient lighting system or sync box to start populating your Light in Motion store.
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center px-4 py-2 rounded-sm bg-cyan-500 text-neutral-950 text-xs font-mono uppercase font-bold tracking-widest hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              + Create First Product
            </Link>
          </div>
        ) : (
          <div className="border border-white/[0.08] rounded-sm overflow-hidden bg-white/[0.01]">
            <div className="divide-y divide-white/[0.06]">
              {products.slice(0, 5).map((prod) => {
                const primaryVariant = prod.variants[0];
                const price = primaryVariant ? primaryVariant.priceInPaisa : 0;
                const compareAt = primaryVariant?.compareAtPriceInPaisa;
                const imageMedia = prod.media.find((m) => m.mediaType === "IMAGE") || prod.media[0];

                return (
                  <div
                    key={prod.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-sm bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                        {imageMedia?.url ? (
                          <img
                            src={imageMedia.url}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[9px] font-mono text-neutral-600">NO IMG</span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {prod.name}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded-xs text-[9px] font-mono uppercase ${
                              prod.active
                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                : "bg-neutral-500/10 border border-neutral-500/20 text-neutral-400"
                            }`}
                          >
                            {prod.active ? "ACTIVE" : "DRAFT"}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono line-clamp-1">
                          {prod.tagline || prod.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 shrink-0">
                      <div className="text-right">
                        <span className="block text-xs font-mono font-semibold text-white">
                          {formatINR(price)}
                        </span>
                        {compareAt && compareAt > price && (
                          <span className="block text-[10px] font-mono text-neutral-500 line-through">
                            {formatINR(compareAt)}
                          </span>
                        )}
                      </div>

                      <div className="text-right font-mono text-xs">
                        <span className="text-neutral-400">Stock: </span>
                        <span
                          className={
                            (primaryVariant?.stockQuantity || 0) > 0
                              ? "text-white font-medium"
                              : "text-rose-400 font-medium"
                          }
                        >
                          {primaryVariant?.stockQuantity || 0}
                        </span>
                      </div>

                      <Link
                        href={`/admin/products/${prod.id}/edit`}
                        className="px-3 py-1.5 rounded-sm bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-wider transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
