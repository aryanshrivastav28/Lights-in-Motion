import React from "react";
import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "New Product | Light in Motion Admin",
};

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/admin/products"
            className="text-xs font-mono text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeftIcon size={12} />
            <span>Back to Products</span>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
          Add Hardware Product
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono">
          Configure product title, technical specs, pricing, discount tiers, and media assets.
        </p>
      </div>

      {/* Form */}
      <ProductForm />
    </div>
  );
}
