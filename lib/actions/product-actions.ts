"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export interface CreateProductInput {
  name: string;
  slug?: string;
  tagline?: string;
  description: string;
  active?: boolean;
  priceInRupees: number;
  compareAtPriceInRupees?: number;
  sku?: string;
  stockQuantity: number;
  weightInGrams?: number;
  media: Array<{
    url: string;
    alt?: string;
    mediaType?: "IMAGE" | "VIDEO";
  }>;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fetch all products (optionally filtering only active products for the storefront)
 */
export async function getProducts(options?: { activeOnly?: boolean }) {
  try {
    const products = await prisma.product.findMany({
      where: options?.activeOnly ? { active: true } : undefined,
      include: {
        variants: true,
        media: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: products };
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return { success: false, error: error?.message || "Failed to fetch products", data: [] };
  }
}

/**
 * Fetch a single product by ID or Slug
 */
export async function getProductById(idOrSlug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        variants: true,
        media: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, data: product };
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return { success: false, error: error?.message || "Failed to fetch product" };
  }
}

/**
 * Create a new product with default variant and media assets
 */
export async function createProduct(input: CreateProductInput) {
  try {
    const slug = input.slug?.trim() ? generateSlug(input.slug) : generateSlug(input.name);
    const sku = input.sku?.trim() || `LIM-${slug.toUpperCase()}-001`;

    // Ensure unique slug
    const existing = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const priceInPaisa = Math.round(Number(input.priceInRupees) * 100);
    const compareAtPriceInPaisa = input.compareAtPriceInRupees
      ? Math.round(Number(input.compareAtPriceInRupees) * 100)
      : null;

    const newProduct = await prisma.$transaction(async (tx) => {
      // 1. Create Product
      const product = await tx.product.create({
        data: {
          name: input.name.trim(),
          slug: finalSlug,
          tagline: input.tagline?.trim() || null,
          description: input.description.trim(),
          active: input.active !== false,
        },
      });

      // 2. Create Default Variant
      await tx.productVariant.create({
        data: {
          productId: product.id,
          sku,
          name: "Standard Edition",
          priceInPaisa,
          compareAtPriceInPaisa,
          stockQuantity: Math.max(0, Number(input.stockQuantity) || 0),
          weightInGrams: Number(input.weightInGrams) || 500,
          active: true,
        },
      });

      // 3. Create Media Items if provided
      if (input.media && input.media.length > 0) {
        const mediaData = input.media
          .filter((m) => m.url?.trim())
          .map((m, idx) => ({
            productId: product.id,
            url: m.url.trim(),
            alt: m.alt?.trim() || input.name,
            mediaType: m.mediaType || (m.url.match(/\.(mp4|webm|ogg)$/i) ? "VIDEO" : "IMAGE"),
            sortOrder: idx,
          }));

        if (mediaData.length > 0) {
          await tx.productMedia.createMany({
            data: mediaData,
          });
        }
      }

      return product;
    });

    revalidatePath("/store");
    revalidatePath("/admin/products");
    revalidatePath("/admin");

    return { success: true, data: newProduct };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return { success: false, error: error?.message || "Failed to create product" };
  }
}

/**
 * Update an existing product, its variant pricing, and media
 */
export async function updateProduct(input: UpdateProductInput) {
  try {
    const { id } = input;
    if (!id) return { success: false, error: "Product ID is required" };

    await prisma.$transaction(async (tx) => {
      // 1. Update Product details
      const updateData: any = {};
      if (input.name) updateData.name = input.name.trim();
      if (input.tagline !== undefined) updateData.tagline = input.tagline?.trim() || null;
      if (input.description) updateData.description = input.description.trim();
      if (input.active !== undefined) updateData.active = input.active;

      await tx.product.update({
        where: { id },
        data: updateData,
      });

      // 2. Update Primary Variant pricing & inventory
      const firstVariant = await tx.productVariant.findFirst({
        where: { productId: id },
      });

      if (firstVariant) {
        const variantUpdate: any = {};
        if (input.priceInRupees !== undefined) {
          variantUpdate.priceInPaisa = Math.round(Number(input.priceInRupees) * 100);
        }
        if (input.compareAtPriceInRupees !== undefined) {
          variantUpdate.compareAtPriceInPaisa = input.compareAtPriceInRupees
            ? Math.round(Number(input.compareAtPriceInRupees) * 100)
            : null;
        }
        if (input.stockQuantity !== undefined) {
          variantUpdate.stockQuantity = Math.max(0, Number(input.stockQuantity));
        }
        if (input.sku) {
          variantUpdate.sku = input.sku.trim();
        }

        await tx.productVariant.update({
          where: { id: firstVariant.id },
          data: variantUpdate,
        });
      }

      // 3. Update Media (replace if provided)
      if (input.media !== undefined) {
        await tx.productMedia.deleteMany({
          where: { productId: id },
        });

        const validMedia = input.media.filter((m) => m.url?.trim());
        if (validMedia.length > 0) {
          await tx.productMedia.createMany({
            data: validMedia.map((m, idx) => ({
              productId: id,
              url: m.url.trim(),
              alt: m.alt?.trim() || input.name || "Product Media",
              mediaType: m.mediaType || (m.url.match(/\.(mp4|webm|ogg)$/i) ? "VIDEO" : "IMAGE"),
              sortOrder: idx,
            })),
          });
        }
      }
    });

    revalidatePath("/store");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);

    return { success: true };
  } catch (error: any) {
    console.error("Error updating product:", error);
    return { success: false, error: error?.message || "Failed to update product" };
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/store");
    revalidatePath("/admin/products");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { success: false, error: error?.message || "Failed to delete product" };
  }
}
