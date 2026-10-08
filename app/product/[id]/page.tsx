import React from "react";
import { notFound } from "next/navigation";
import { PRODUCT_CATALOG } from "@/lib/data/product-catalog";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product =
    PRODUCT_CATALOG[id] ||
    PRODUCT_CATALOG[id.toLowerCase()] ||
    PRODUCT_CATALOG["cloudlights"];

  return {
    title: `${product.title} | LIGHTINMOTION`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product =
    PRODUCT_CATALOG[id] ||
    PRODUCT_CATALOG[id.toLowerCase()] ||
    PRODUCT_CATALOG["cloudlights"];

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
