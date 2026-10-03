import React from "react";
import Link from "next/link";
import { getProducts, deleteProduct } from "@/lib/actions/product-actions";
import { formatINR } from "@/lib/utils/formatters";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const result = await getProducts();
  const products = result.success && result.data ? result.data : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="text-xs font-mono text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeftIcon size={12} />
              <span>Admin Overview</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
            Hardware Products
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Manage your hardware devices, specifications, pricing, discounts, and inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center px-4 py-2 rounded-sm bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-mono tracking-widest uppercase font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.25)]"
          >
            <span>+ Add Product</span>
          </Link>
        </div>
      </div>

      {/* Product List */}
      {products.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-sm border border-dashed border-white/10 bg-white/[0.01]">
          <p className="text-base font-mono text-neutral-300 mb-2">
            No products found in catalog.
          </p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
            Get started by adding your first ambient lighting kit, sync box, or display accessory.
          </p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center px-4 py-2 rounded-sm bg-cyan-500 text-neutral-950 text-xs font-mono uppercase font-bold tracking-widest hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]"
          >
            + Create New Product
          </Link>
        </div>
      ) : (
        <div className="border border-white/[0.08] rounded-sm overflow-hidden bg-white/[0.01]">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.08] bg-white/[0.02] text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            <div className="col-span-5">Hardware Model</div>
            <div className="col-span-2">SKU / Code</div>
            <div className="col-span-2">Price / Discount</div>
            <div className="col-span-1">Stock</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/[0.06]">
            {products.map((prod) => {
              const primaryVariant = prod.variants[0];
              const price = primaryVariant ? primaryVariant.priceInPaisa : 0;
              const compareAt = primaryVariant?.compareAtPriceInPaisa;
              const discountPercent =
                compareAt && compareAt > price
                  ? Math.round(((compareAt - price) / compareAt) * 100)
                  : 0;

              const imageMedia =
                prod.media.find((m) => m.mediaType === "IMAGE") || prod.media[0];

              return (
                <div
                  key={prod.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-4 sm:px-6 py-4 items-center hover:bg-white/[0.02] transition-colors"
                >
                  {/* Model & Image */}
                  <div className="sm:col-span-5 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-sm bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                      {imageMedia?.url ? (
                        <img
                          src={imageMedia.url}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[8px] font-mono text-neutral-600">NO IMG</span>
                      )}
                    </div>
                    <div className="space-y-0.5">
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
                        {prod.tagline || `/${prod.slug}`}
                      </p>
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="sm:col-span-2 text-xs font-mono text-neutral-300">
                    <span className="sm:hidden text-neutral-500 mr-2">SKU:</span>
                    {primaryVariant?.sku || "—"}
                  </div>

                  {/* Price & Discount */}
                  <div className="sm:col-span-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs sm:text-sm font-mono font-semibold text-white">
                        {formatINR(price)}
                      </span>
                      {compareAt && compareAt > price && (
                        <span className="text-[11px] font-mono text-neutral-500 line-through">
                          {formatINR(compareAt)}
                        </span>
                      )}
                    </div>
                    {discountPercent > 0 && (
                      <span className="text-[10px] font-mono text-cyan-400">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="sm:col-span-1">
                    <span className="sm:hidden text-neutral-500 mr-2 text-xs font-mono">Stock:</span>
                    <span
                      className={`text-xs font-mono font-semibold ${
                        (primaryVariant?.stockQuantity || 0) > 0
                          ? "text-white"
                          : "text-rose-400"
                      }`}
                    >
                      {primaryVariant?.stockQuantity || 0}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="sm:col-span-2 flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${prod.id}/edit`}
                      className="px-2.5 py-1 rounded-sm bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-wider transition-colors"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProduct(prod.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="px-2.5 py-1 rounded-sm bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-mono text-rose-400 uppercase tracking-wider transition-colors"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
