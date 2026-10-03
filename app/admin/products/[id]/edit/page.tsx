import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/actions/product-actions";
import { ProductForm } from "@/components/admin/ProductForm";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const result = await getProductById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const product = result.data;
  const primaryVariant = product.variants[0];

  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.tagline,
    description: product.description,
    active: product.active,
    priceInRupees: primaryVariant ? primaryVariant.priceInPaisa / 100 : 0,
    compareAtPriceInRupees: primaryVariant?.compareAtPriceInPaisa
      ? primaryVariant.compareAtPriceInPaisa / 100
      : undefined,
    sku: primaryVariant?.sku,
    stockQuantity: primaryVariant?.stockQuantity ?? 0,
    weightInGrams: primaryVariant?.weightInGrams ?? 500,
    media: product.media.map((m) => ({
      url: m.url,
      alt: m.alt || "",
      mediaType: (m.mediaType as "IMAGE" | "VIDEO") || "IMAGE",
    })),
  };

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
          Edit: {product.name}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono">
          Update hardware specs, pricing, discount tiers, or media gallery.
        </p>
      </div>

      {/* Form */}
      <ProductForm initialData={initialData} />
    </div>
  );
}
