"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DetailedProduct,
  ProductVariant,
  ReviewItem,
  PRODUCT_CATALOG,
} from "@/lib/data/product-catalog";
import { useLocalization } from "@/context/LocalizationContext";
import { ReelsShowcase } from "@/components/shared/ReelsShowcase";
import { cn } from "@/lib/utils/cn";

interface ProductDetailViewProps {
  product: DetailedProduct;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const { t, formatPrice } = useLocalization();

  // Active Variant & Price
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: "default",
      name: "Standard",
      priceInINR: product.basePriceInINR,
    }
  );

  // Quantity Stepper
  const [quantity, setQuantity] = useState<number>(1);

  // Active Media tab: "image" or "video"
  const [activeMedia, setActiveMedia] = useState<"image" | "video">(
    product.video ? "video" : "image"
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Accordion toggles
  const [detailsOpen, setDetailsOpen] = useState<boolean>(true);
  const [shippingOpen, setShippingOpen] = useState<boolean>(false);

  // Cart action feedback
  const [addedToCartToast, setAddedToCartToast] = useState<boolean>(false);
  const [buyNowModalOpen, setBuyNowModalOpen] = useState<boolean>(false);

  // Reviews state with localStorage persistence
  const [reviews, setReviews] = useState<ReviewItem[]>(product.defaultReviews);
  const [writeReviewOpen, setWriteReviewOpen] = useState<boolean>(false);
  const [reviewSubmittedToast, setReviewSubmittedToast] = useState<boolean>(false);

  // New Review Form State
  const [formRating, setFormRating] = useState<number>(5);
  const [formHoverRating, setFormHoverRating] = useState<number>(0);
  const [formAuthor, setFormAuthor] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formComment, setFormComment] = useState<string>("");
  const [formRecommend, setFormRecommend] = useState<boolean>(true);
  const [formError, setFormError] = useState<string>("");

  // Helpful votes state
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});

  // Load persisted reviews from localStorage on mount
  useEffect(() => {
    try {
      const storageKey = `lim_reviews_${product.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge unique reviews
          setReviews([...parsed, ...product.defaultReviews.filter(
            (def) => !parsed.some((p: ReviewItem) => p.id === def.id)
          )]);
        }
      }
    } catch {
      // Storage unavailable
    }
  }, [product.id, product.defaultReviews]);

  // Handle Quantity
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };
  const handleIncrement = () => {
    if (quantity < 10) setQuantity((prev) => prev + 1);
  };

  // Add to cart handler
  const handleAddToCart = () => {
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3500);
  };

  // Buy it now handler
  const handleBuyNow = () => {
    setBuyNowModalOpen(true);
  };

  // Handle Review Submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formComment.trim() || !formTitle.trim()) {
      setFormError("Please fill in your name, review headline, and comments.");
      return;
    }

    setFormError("");

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: formAuthor.trim(),
      rating: formRating,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      title: formTitle.trim(),
      comment: formComment.trim(),
      verified: true,
      helpfulCount: 0,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    // Persist to localStorage
    try {
      const storageKey = `lim_reviews_${product.id}`;
      const userCustomOnly = updated.filter(
        (r) => !product.defaultReviews.some((def) => def.id === r.id)
      );
      localStorage.setItem(storageKey, JSON.stringify(userCustomOnly));
    } catch {}

    // Reset form and show success toast
    setFormAuthor("");
    setFormEmail("");
    setFormTitle("");
    setFormComment("");
    setFormRating(5);
    setWriteReviewOpen(false);
    setReviewSubmittedToast(true);
    setTimeout(() => setReviewSubmittedToast(false), 5000);
  };

  // Handle Helpful Upvote
  const handleHelpful = (reviewId: string) => {
    if (votedReviews[reviewId]) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
    setVotedReviews((prev) => ({ ...prev, [reviewId]: true }));
  };

  // Calculate Average Rating
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount
    ? (
        reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsCount
      ).toFixed(1)
    : "5.0";

  // Related products from catalog
  const relatedProducts = Object.values(PRODUCT_CATALOG)
    .filter(
      (p, index, self) =>
        p.id !== product.id &&
        self.findIndex((t) => t.id === p.id) === index
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#963b18] selection:text-white flex flex-col pt-24 sm:pt-28">
      {/* Product Showcase Section */}
      <div className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs text-neutral-400 font-mono">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/store" className="hover:text-white transition-colors">
              COLLECTION
            </Link>
            <span>/</span>
            <span className="text-neutral-200 truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </nav>

          {/* Product Primary Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: Media Stage (Image & Video) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              {/* Main Media Showcase Display */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:min-h-[460px] lg:min-h-[500px] bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.9)] flex items-center justify-center">
                
                {/* Active Media Display: Video */}
                {activeMedia === "video" && product.video ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <video
                      key={product.video}
                      src={product.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className="w-full h-full object-contain rounded-2xl sm:rounded-3xl"
                    />
                  </div>
                ) : (
                  /* Active Media Display: High-Res Image */
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <Image
                      src={product.images[selectedImageIndex] || product.images[0]}
                      alt={product.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-contain rounded-2xl sm:rounded-3xl"
                    />
                  </div>
                )}
              </div>

              {/* Media Thumbnails Switcher Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                
                {/* Video Media Tab Button if video exists */}
                {product.video && (
                  <button
                    type="button"
                    onClick={() => setActiveMedia("video")}
                    className={cn(
                      "relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center bg-[#101216]",
                      activeMedia === "video"
                        ? "border-[#963b18] shadow-[0_0_15px_rgba(150,59,24,0.5)] ring-2 ring-[#963b18]/40"
                        : "border-white/10 hover:border-white/30 opacity-75 hover:opacity-100"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1 text-white">
                      <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-300 uppercase">
                      Video
                    </span>
                  </button>
                )}

                {/* Image Media Tab Buttons */}
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveMedia("image");
                      setSelectedImageIndex(idx);
                    }}
                    className={cn(
                      "relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer bg-[#101216]",
                      activeMedia === "image" && selectedImageIndex === idx
                        ? "border-[#963b18] shadow-[0_0_15px_rgba(150,59,24,0.5)] ring-2 ring-[#963b18]/40"
                        : "border-white/10 hover:border-white/30 opacity-75 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Title, Converted Price, Variants, Actions, Description */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              
              {/* Product Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                  {product.title}
                </h1>

                {/* Converted Dynamic Price matching uploaded reference */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {formatPrice(selectedVariant.priceInINR)}
                  </span>
                  {selectedVariant.compareAtPriceInINR && (
                    <span className="text-base sm:text-lg text-neutral-500 line-through">
                      {formatPrice(selectedVariant.compareAtPriceInINR)}
                    </span>
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#963b18]/20 text-[#f36b3b] border border-[#963b18]/40">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Variants Selector Pills matching uploaded reference */}
              {product.variants.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="block text-xs font-mono tracking-wider uppercase text-neutral-400 font-semibold">
                    Select Option / Size:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.map((variant) => {
                      const isSelected = selectedVariant.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setSelectedVariant(variant)}
                          className={cn(
                            "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-sm border",
                            isSelected
                              ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-100 font-bold"
                              : "bg-[#111317] text-neutral-300 border-white/20 hover:border-white/40 hover:text-white"
                          )}
                        >
                          {variant.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart Row */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  
                  {/* Quantity Stepper Pill matching uploaded reference `- 1 +` */}
                  <div className="flex items-center justify-between bg-[#121318] border border-white/20 rounded-full px-3 py-2 w-32 shadow-inner">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-white select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={quantity >= 10}
                      aria-label="Increase quantity"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Black Rounded Button matching uploaded reference */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-black hover:bg-neutral-900 text-white font-bold text-sm sm:text-base py-3 px-6 rounded-full border border-white/30 hover:border-white/60 flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span>Add to cart</span>
                  </button>
                </div>

                {/* Buy it now Button matching uploaded reference */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#B2B594] hover:bg-[#c2c5a2] text-neutral-950 font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-full shadow-[0_4px_20px_rgba(178,181,148,0.3)] transition-all active:scale-[0.98] cursor-pointer text-center"
                >
                  Buy it now
                </button>
              </div>

              {/* Notification Toast for Add to Cart */}
              {addedToCartToast && (
                <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-xl p-3.5 text-xs sm:text-sm font-medium flex items-center justify-between animate-in fade-in duration-200">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Added {quantity} × {product.title} ({selectedVariant.name}) to cart!
                  </span>
                  <Link href="/store" className="underline font-bold hover:text-white">
                    View Cart
                  </Link>
                </div>
              )}

              {/* 8-Part Consumer-Electronics Branding Architecture */}
              <div className="pt-6 border-t border-white/10 space-y-5">
                
                {/* 1. One-Line Premium Headline */}
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug font-sans">
                  {product.headline}
                </h2>

                {/* 2. Short Emotional/Product Introduction */}
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {product.introduction}
                </p>

                {/* 3. How It Works / Experience */}
                <div className="bg-[#0C0D11] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3 shadow-inner">
                  <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#963b18]" />
                    {product.experienceTitle}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {product.experienceContent.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* 4. Key Features */}
                <div className="space-y-3 pt-1">
                  <span className="block text-xs font-mono tracking-wider uppercase text-neutral-400 font-semibold">
                    Key Features
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 font-medium"
                      >
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Perfect For */}
                <div className="space-y-2.5 pt-1">
                  <span className="block text-xs font-mono tracking-wider uppercase text-neutral-400 font-semibold">
                    Perfect For
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.perfectFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-200 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 8. Final LightinMotion Tagline Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#963b18]/25 via-[#963b18]/10 to-transparent border-l-4 border-[#963b18] text-sm text-white">
                  <span className="font-extrabold text-white not-italic font-mono">{product.title}</span>
                  <span className="text-neutral-400 mx-2">—</span>
                  <span className="italic text-neutral-200 font-medium">{product.tagline}</span>
                </div>
              </div>

              {/* Collapsible Accordions: 6. Technical Specifications & 7. What's Included */}
              <div className="border-t border-white/10 pt-2 space-y-2">
                
                {/* 6. Technical Specifications & 7. What's Included Accordion */}
                <div className="border-b border-white/10 py-3">
                  <button
                    type="button"
                    onClick={() => setDetailsOpen(!detailsOpen)}
                    className="w-full flex items-center justify-between text-base font-bold text-white hover:text-neutral-200 transition-colors cursor-pointer text-left py-1"
                  >
                    <span>Technical Specifications & What's Included</span>
                    <span className="text-xl font-mono text-neutral-400">
                      {detailsOpen ? "−" : "+"}
                    </span>
                  </button>
                  {detailsOpen && (
                    <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-300 space-y-4 animate-in fade-in duration-150">
                      
                      {/* Specifications Table */}
                      <div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2 font-mono">
                          Technical Specifications:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {product.specs.map((spec, i) => (
                            <div key={i} className="flex flex-col bg-white/[0.03] p-2.5 rounded-xl border border-white/10">
                              <span className="text-neutral-400 font-mono text-[10px] uppercase">
                                {spec.label}
                              </span>
                              <span className="text-neutral-100 font-bold mt-0.5">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 7. What's Included Checklist */}
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2 font-mono">
                          What's Included:
                        </span>
                        <ul className="text-xs text-neutral-300 space-y-1.5 list-none">
                          {product.whatsInTheBox.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="text-[#963b18] font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns Accordion */}
                <div className="border-b border-white/10 py-3">
                  <button
                    type="button"
                    onClick={() => setShippingOpen(!shippingOpen)}
                    className="w-full flex items-center justify-between text-base font-bold text-white hover:text-neutral-200 transition-colors cursor-pointer text-left py-1"
                  >
                    <span>Shipping & Returns</span>
                    <span className="text-xl font-mono text-neutral-400">
                      {shippingOpen ? "−" : "+"}
                    </span>
                  </button>
                  {shippingOpen && (
                    <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-400 space-y-2 animate-in fade-in duration-150">
                      {product.shippingInfo.map((info, i) => (
                        <p key={i} className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{info}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

          {/* ============================================================== */}
          {/* CUSTOMER REVIEWS SECTION (Visible after scrolling down) */}
          {/* ============================================================== */}
          <section id="reviews" className="mt-28 sm:mt-36 pt-16 border-t border-white/15">
            
            {/* Reviews Header & Summary Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#963b18] block mb-2">
                  VERIFIED FEEDBACK
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Customer Reviews
                </h2>
                
                {/* Overall Stars & Stats */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex text-amber-400 text-lg">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-lg font-black text-white">
                    {averageRating}
                  </span>
                  <span className="text-xs text-neutral-400 font-sans">
                    based on {totalReviewsCount} reviews
                  </span>
                </div>
              </div>

              {/* "Write a Review" Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setWriteReviewOpen(!writeReviewOpen)}
                  className="bg-white hover:bg-neutral-200 text-black font-extrabold text-xs sm:text-sm py-3 px-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <span>{writeReviewOpen ? "Close Form" : "Write a Review"}</span>
                </button>
              </div>
            </div>

            {/* Notification Toast for Review Submitted */}
            {reviewSubmittedToast && (
              <div className="my-6 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-2xl p-4 text-sm font-medium flex items-center gap-3 animate-in fade-in">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                <span>
                  Thank you for your honest feedback! Your review has been verified and posted below.
                </span>
              </div>
            )}

            {/* Interactive "Write a Review" Form Container */}
            {writeReviewOpen && (
              <form
                onSubmit={handleReviewSubmit}
                className="my-8 bg-[#0D0E12] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-2xl animate-in fade-in zoom-in-98 duration-200"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">Write Your Honest Review</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Share your experience with {product.title}. Your feedback helps fellow customers!
                  </p>
                </div>

                {formError && (
                  <div className="mb-4 text-xs font-semibold text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                    {formError}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Interactive Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5 font-semibold">
                      Your Overall Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setFormHoverRating(star)}
                          onMouseLeave={() => setFormHoverRating(0)}
                          onClick={() => setFormRating(star)}
                          className="text-2xl sm:text-3xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                        >
                          <span
                            className={
                              (formHoverRating || formRating) >= star
                                ? "text-amber-400"
                                : "text-neutral-600"
                            }
                          >
                            ★
                          </span>
                        </button>
                      ))}
                      <span className="ml-3 text-xs font-mono text-neutral-400">
                        {formRating === 5
                          ? "5 / 5 (Excellent)"
                          : formRating === 4
                          ? "4 / 5 (Very Good)"
                          : formRating === 3
                          ? "3 / 5 (Average)"
                          : formRating === 2
                          ? "2 / 5 (Fair)"
                          : "1 / 5 (Poor)"}
                      </span>
                    </div>
                  </div>

                  {/* Name & Email inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formAuthor}
                        onChange={(e) => setFormAuthor(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-[#13151B] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1 font-semibold">
                        Email Address (Private) *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full bg-[#13151B] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Review Headline Title */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1 font-semibold">
                      Review Title / Headline *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Mind-blowing ambient effect, highly recommended!"
                      className="w-full bg-[#13151B] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white/50 transition-colors"
                    />
                  </div>

                  {/* Review Comments Textarea */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1 font-semibold">
                      Your Honest Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      placeholder="Tell us what you liked about the lighting, how easy the setup was, or how it looks in your room..."
                      className="w-full bg-[#13151B] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white/50 transition-colors resize-y"
                    />
                  </div>

                  {/* Would you recommend toggle */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-neutral-300 font-medium">
                      Would you recommend this product?
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormRecommend(true)}
                      className={cn(
                        "text-xs px-3 py-1 rounded-full border transition-colors cursor-pointer",
                        formRecommend
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                          : "text-neutral-400 border-white/10 hover:border-white/30"
                      )}
                    >
                      ✓ Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormRecommend(false)}
                      className={cn(
                        "text-xs px-3 py-1 rounded-full border transition-colors cursor-pointer",
                        !formRecommend
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold"
                          : "text-neutral-400 border-white/10 hover:border-white/30"
                      )}
                    >
                      ✕ No
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setWriteReviewOpen(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#963b18] hover:bg-[#b0451c] text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* List of Verified Reviews */}
            <div className="mt-8 space-y-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#0B0C0E] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.6)] space-y-3.5 hover:border-white/20 transition-colors"
                >
                  {/* Reviewer Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-white font-mono">
                        {rev.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">
                            {rev.author}
                          </span>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              ✓ Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-neutral-500 font-sans">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex text-amber-400 text-sm">
                      {"★".repeat(rev.rating)}
                      <span className="text-neutral-600">
                        {"★".repeat(5 - rev.rating)}
                      </span>
                    </div>
                  </div>

                  {/* Review Title & Body */}
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {rev.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-neutral-300 leading-relaxed font-sans">
                      {rev.comment}
                    </p>
                  </div>

                  {/* Helpful Button */}
                  <div className="pt-2 flex items-center gap-3 text-xs text-neutral-500 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => handleHelpful(rev.id)}
                      disabled={votedReviews[rev.id]}
                      className={cn(
                        "flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer",
                        votedReviews[rev.id] ? "text-emerald-400 font-bold" : ""
                      )}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span>
                        {votedReviews[rev.id]
                          ? `Helpful (${rev.helpfulCount})`
                          : `Helpful (${rev.helpfulCount})`}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* ============================================================== */}
          {/* RELATED PRODUCTS ("You May Also Like") */}
          {/* ============================================================== */}
          <section className="mt-24 sm:mt-32 pt-16 border-t border-white/10">
            <div className="text-center mb-12">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-neutral-400">
                COMPLETE YOUR LIGHTING ECOSYSTEM
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                You May Also Like
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="bg-[#0B0C0E] rounded-2xl p-4 border border-white/10 shadow-lg hover:border-white/30 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 mb-3">
                    <Image
                      src={rel.images[0]}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-neutral-200 transition-colors line-clamp-1">
                      {rel.title}
                    </h3>
                    <p className="text-base font-black text-white">
                      {formatPrice(rel.basePriceInINR)}
                    </p>
                  </div>
                  <div className="mt-3 w-full py-2 bg-[#963b18] group-hover:bg-[#b0451c] text-white text-xs font-bold rounded-lg text-center transition-colors">
                    View Product
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Watch. Explore. Choose. Reels Showcase Section */}
          <ReelsShowcase className="mt-16 sm:mt-24 border-t border-white/10" />

        </div>
      </div>

      {/* Buy It Now Quick Checkout Modal */}
      {buyNowModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E1014] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Instant Checkout</h3>
              <button
                type="button"
                onClick={() => setBuyNowModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">{product.title}</h4>
                <p className="text-xs text-neutral-400">{selectedVariant.name}</p>
                <p className="text-sm font-black text-white">
                  Qty: {quantity} • Total: {formatPrice(selectedVariant.priceInINR * quantity)}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Ready to uplevel your setup? You will be redirected to secure Razorpay payment gateway with full UPI, Card, NetBanking and COD support.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  alert(`Thank you for choosing LIGHTINMOTION! Proceeding to order ${quantity}x ${product.title} (${selectedVariant.name}).`);
                  setBuyNowModalOpen(false);
                }}
                className="w-full bg-[#B2B594] hover:bg-[#c2c5a2] text-black font-extrabold py-3.5 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer text-sm"
              >
                Proceed to Payment ({formatPrice(selectedVariant.priceInINR * quantity)})
              </button>
              <button
                type="button"
                onClick={() => setBuyNowModalOpen(false)}
                className="w-full py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Closing Container */}
    </div>
  );
};

export default ProductDetailView;
