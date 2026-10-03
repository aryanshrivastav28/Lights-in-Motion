import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/actions/product-actions";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hardware Store | Light in Motion",
  description:
    "Explore cinema-grade ambient lighting hardware, zero-latency sync boxes, and custom display backlights.",
};

export default async function StorePage() {
  const result = await getProducts({ activeOnly: true });
  const products = result.success && result.data ? result.data : [];

  return (
    <div className="w-full py-10 sm:py-16 min-h-[80vh]">
      <Container size="wide">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
            <span>HARDWARE COLLECTION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.2em] uppercase text-white">
            LIGHT IN MOTION STORE
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Cinema-grade ambient lighting systems, sync boxes, and custom display backlights for monitors and home theaters.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs font-mono text-neutral-300 transition-colors"
            >
              <ArrowLeftIcon size={12} />
              <span>RETURN HOME</span>
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-400 transition-colors"
            >
              <span>ADMIN PANEL</span>
            </Link>
          </div>
        </div>

        {/* Product Catalog Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-sm border border-dashed border-white/10 bg-white/[0.01] max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 font-mono text-sm">
              LIM
            </div>
            <h3 className="text-base font-semibold text-white">
              Catalog Initializing
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed font-mono">
              The hardware store database is connected. You can now use the Admin Panel to publish your products, set discounts, and upload media.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center px-4 py-2 rounded-sm bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-mono font-bold tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                + Add Product in Admin
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => {
              const primaryVariant = product.variants[0];
              const price = primaryVariant ? primaryVariant.priceInPaisa : 0;
              const compareAt = primaryVariant?.compareAtPriceInPaisa ?? undefined;
              const imageMedia =
                product.media.find((m) => m.mediaType === "IMAGE") || product.media[0];

              const stock = primaryVariant?.stockQuantity ?? 0;
              let availability: "in_stock" | "low_stock" | "pre_order" = "in_stock";
              if (stock === 0) {
                availability = "pre_order";
              } else if (stock <= 5) {
                availability = "low_stock";
              }

              let badge = "CINEMA HARDWARE";
              if (compareAt && compareAt > price) {
                const pct = Math.round(((compareAt - price) / compareAt) * 100);
                badge = `${pct}% OFF`;
              }

              return (
                <ProductCard
                  key={product.id}
                  id={product.slug || product.id}
                  title={product.name}
                  descriptor={product.tagline || product.description}
                  price={price}
                  compareAtPrice={compareAt}
                  badge={badge}
                  availability={availability}
                  imageUrl={imageMedia?.url}
                  href={`/store/${product.slug || product.id}`}
                  actionLabel="EXPLORE SPEC"
                />
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
