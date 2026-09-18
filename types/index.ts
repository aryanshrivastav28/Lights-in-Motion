export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCatalogItem {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description: string;
  active: boolean;
  sortOrder: number;
  startingPriceInPaisa: number;
  compareAtPriceInPaisa?: number | null;
  primaryImageUrl?: string;
  variantsCount: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  badge?: string;
}

export interface CartItemSummary {
  variantId: string;
  productId: string;
  name: string;
  variantName: string;
  sku: string;
  priceInPaisa: number;
  quantity: number;
  imageUrl?: string;
}
