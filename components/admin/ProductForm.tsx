"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product-actions";
import { formatINR } from "@/lib/utils/formatters";

interface MediaItem {
  url: string;
  alt: string;
  mediaType: "IMAGE" | "VIDEO";
}

interface ProductFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    tagline?: string | null;
    description: string;
    active: boolean;
    priceInRupees: number;
    compareAtPriceInRupees?: number;
    sku?: string;
    stockQuantity: number;
    weightInGrams?: number;
    media: MediaItem[];
  };
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [active, setActive] = useState(initialData ? initialData.active : true);

  const [price, setPrice] = useState<number | "">(initialData?.priceInRupees ?? "");
  const [compareAtPrice, setCompareAtPrice] = useState<number | "">(
    initialData?.compareAtPriceInRupees ?? ""
  );

  const [sku, setSku] = useState(initialData?.sku || "");
  const [stock, setStock] = useState<number | "">(initialData?.stockQuantity ?? 100);
  const [weight, setWeight] = useState<number | "">(initialData?.weightInGrams ?? 500);

  const [mediaList, setMediaList] = useState<MediaItem[]>(
    initialData?.media && initialData.media.length > 0
      ? initialData.media
      : [{ url: "", alt: "", mediaType: "IMAGE" }]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-slug generator when typing name
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
      if (!sku) {
        setSku(`LIM-${generated.toUpperCase().slice(0, 10)}-01`);
      }
    }
  };

  const handleAddMedia = () => {
    setMediaList([...mediaList, { url: "", alt: "", mediaType: "IMAGE" }]);
  };

  const handleRemoveMedia = (index: number) => {
    setMediaList(mediaList.filter((_, i) => i !== index));
  };

  const handleMediaChange = (
    index: number,
    field: keyof MediaItem,
    value: string
  ) => {
    const updated = [...mediaList];
    updated[index] = { ...updated[index], [field]: value };
    // Auto-detect video
    if (field === "url") {
      if (value.match(/\.(mp4|webm|ogg)$/i) || value.includes("youtube.com") || value.includes("vimeo.com")) {
        updated[index].mediaType = "VIDEO";
      }
    }
    setMediaList(updated);
  };

  // Calculate discount percentage
  const numPrice = Number(price) || 0;
  const numCompare = Number(compareAtPrice) || 0;
  const discountAmount = numCompare > numPrice ? numCompare - numPrice : 0;
  const discountPercent =
    numCompare > numPrice ? Math.round((discountAmount / numCompare) * 100) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Product name is required.");
      return;
    }
    if (numPrice <= 0) {
      setErrorMessage("Please enter a valid price in ₹.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && initialData?.id) {
        const res = await updateProduct({
          id: initialData.id,
          name,
          tagline,
          description,
          active,
          priceInRupees: numPrice,
          compareAtPriceInRupees: numCompare > 0 ? numCompare : undefined,
          sku,
          stockQuantity: Number(stock) || 0,
          weightInGrams: Number(weight) || 500,
          media: mediaList.filter((m) => m.url.trim().length > 0),
        });

        if (!res.success) {
          setErrorMessage(res.error || "Failed to update product");
          setIsSubmitting(false);
          return;
        }
      } else {
        const res = await createProduct({
          name,
          slug,
          tagline,
          description,
          active,
          priceInRupees: numPrice,
          compareAtPriceInRupees: numCompare > 0 ? numCompare : undefined,
          sku,
          stockQuantity: Number(stock) || 0,
          weightInGrams: Number(weight) || 500,
          media: mediaList.filter((m) => m.url.trim().length > 0),
        });

        if (!res.success) {
          setErrorMessage(res.error || "Failed to create product");
          setIsSubmitting(false);
          return;
        }
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {errorMessage && (
        <div className="p-4 rounded-sm bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
          {errorMessage}
        </div>
      )}

      {/* 1. Core Information */}
      <div className="p-6 rounded-sm bg-white/[0.02] border border-white/[0.08] space-y-5">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold">
            01 // Hardware Identity
          </h3>
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-neutral-400">Visibility:</label>
            <button
              type="button"
              onClick={() => setActive(!active)}
              className={`px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase transition-colors ${
                active
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  : "bg-neutral-800 border border-neutral-700 text-neutral-400"
              }`}
            >
              {active ? "ACTIVE (STORE LIVE)" : "DRAFT (HIDDEN)"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Light in Motion 4K Ambient Sync Box Pro"
              className="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                URL Slug (Identifier)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="lim-4k-sync-box-pro"
                className="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-neutral-300 font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                Tagline / Subheading
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Zero-latency HDMI 2.1 Screen Reactive Illumination"
                className="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              Detailed Description & Specs
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide technical features, HDMI standards, LED density, sync rates, dimensions, and cinema integration specs..."
              className="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 2. Pricing & Discounts */}
      <div className="p-6 rounded-sm bg-white/[0.02] border border-white/[0.08] space-y-5">
        <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold border-b border-white/[0.06] pb-3">
          02 // Pricing & Discount Structure
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              Selling Price (₹ INR) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-neutral-500 font-mono text-sm">₹</span>
              <input
                type="number"
                min="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="4999"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              Original / Compare-At Price (₹ INR) <span className="text-neutral-500">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-neutral-500 font-mono text-sm">₹</span>
              <input
                type="number"
                min="1"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="6999"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-neutral-300 font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Live discount preview badge */}
        {discountPercent > 0 && (
          <div className="p-3 rounded-sm bg-cyan-500/[0.07] border border-cyan-500/20 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-300">
              Customer Pricing Preview: <span className="text-white font-bold">{formatINR(numPrice * 100)}</span>{" "}
              <span className="line-through text-neutral-500">{formatINR(numCompare * 100)}</span>
            </span>
            <span className="px-2 py-0.5 rounded-xs bg-cyan-400/20 border border-cyan-400/40 text-cyan-400 font-bold">
              SAVE {discountPercent}% (₹{discountAmount.toLocaleString("en-IN")})
            </span>
          </div>
        )}
      </div>

      {/* 3. Inventory & Logistics */}
      <div className="p-6 rounded-sm bg-white/[0.02] border border-white/[0.08] space-y-5">
        <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold border-b border-white/[0.06] pb-3">
          03 // Inventory & Warehouse Stock
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              SKU Code
            </label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="LIM-SYNC-001"
              className="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              Available Units (Stock) *
            </label>
            <input
              type="number"
              min="0"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="50"
              className="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              Unit Weight (Grams)
            </label>
            <input
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="750"
              className="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900/90 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 4. Media & Video Assets */}
      <div className="p-6 rounded-sm bg-white/[0.02] border border-white/[0.08] space-y-5">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              04 // High-Res Images & 4K Demo Videos
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Paste Cloudinary, S3, or direct media URLs. Images & videos render instantly with zero delay.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddMedia}
            className="px-3 py-1.5 rounded-sm bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-wider transition-colors"
          >
            + Add Asset
          </button>
        </div>

        <div className="space-y-4">
          {mediaList.map((media, idx) => (
            <div
              key={idx}
              className="p-4 rounded-sm bg-neutral-950/60 border border-white/[0.06] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                  Asset #{idx + 1} {idx === 0 && "(PRIMARY STORE IMAGE)"}
                </span>
                {mediaList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(idx)}
                    className="text-xs font-mono text-rose-400 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    value={media.url}
                    onChange={(e) => handleMediaChange(idx, "url", e.target.value)}
                    placeholder="/images/monitor-backlight/1.png or https://res.cloudinary.com/..."
                    className="w-full px-3 py-2 rounded-sm bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="sm:col-span-4 flex gap-2">
                  <select
                    value={media.mediaType}
                    onChange={(e) =>
                      handleMediaChange(idx, "mediaType", e.target.value as "IMAGE" | "VIDEO")
                    }
                    className="px-3 py-2 rounded-sm bg-neutral-900 border border-white/10 text-xs text-neutral-300 font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="IMAGE">Image</option>
                    <option value="VIDEO">4K Video</option>
                  </select>

                  <input
                    type="text"
                    value={media.alt}
                    onChange={(e) => handleMediaChange(idx, "alt", e.target.value)}
                    placeholder="Alt description"
                    className="w-full px-3 py-2 rounded-sm bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Instant Live Preview */}
              {media.url && (
                <div className="mt-2 flex items-center gap-4 p-2 rounded-sm bg-neutral-900/60 border border-white/[0.04]">
                  <div className="w-20 h-16 rounded-sm bg-black overflow-hidden flex items-center justify-center border border-white/10 shrink-0">
                    {media.mediaType === "VIDEO" ? (
                      <video
                        src={media.url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        autoPlay
                        loop
                      />
                    ) : (
                      <img
                        src={media.url}
                        alt={media.alt || "Preview"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 space-y-0.5">
                    <span className="text-emerald-400">✓ Live preview active</span>
                    <p className="line-clamp-1 text-neutral-500">{media.url}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Action Row */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/[0.08]">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono tracking-wider uppercase text-neutral-400 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-sm bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-neutral-950 text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] cursor-pointer"
        >
          {isSubmitting
            ? "SAVING TO DATABASE..."
            : isEditing
            ? "UPDATE PRODUCT SPECIFICATIONS"
            : "PUBLISH HARDWARE PRODUCT"}
        </button>
      </div>
    </form>
  );
}
