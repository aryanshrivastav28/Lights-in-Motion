"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { SITE_IMAGES } from "@/lib/config/site-images";

export interface GalleryItem {
  src: string;
  alt: string;
  code: string;
  title?: string;
  fallback?: string;
}

const DEFAULT_GALLERY_IMAGES: GalleryItem[] = SITE_IMAGES.gallery;

export const HoverExpandGallery: React.FC<{
  images?: GalleryItem[];
  className?: string;
}> = ({ images = DEFAULT_GALLERY_IMAGES, className }) => {
  return (
    <section className="w-full py-16 sm:py-24 bg-transparent text-black overflow-hidden select-none border-t border-black/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-black uppercase leading-[1.05]">
          LIGHT IN MOTION<br />HARDWARE SHOWCASE
        </h2>
      </div>

      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <HoverExpand_001 className={className} images={images} />
      </div>
    </section>
  );
};

export const HoverExpand_001 = ({
  images,
  className,
}: {
  images: GalleryItem[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveImage(index);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveImage((prev) => (prev + 1) % images.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.1,
      }}
      className={cn("relative w-full max-w-7xl px-4 sm:px-6 font-sans", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div
          role="tablist"
          aria-label="Light in Motion Hardware Modules"
          className="flex w-full items-center justify-start sm:justify-center gap-3 overflow-x-auto py-6 px-2 no-scrollbar scroll-smooth"
        >
          {images.map((image, index) => {
            const isActive = activeImage === index;

            return (
              <motion.div
                key={index}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                aria-label={image.title || image.alt}
                layout
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-2xl border shrink-0 transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white flex flex-col justify-between",
                  isActive
                    ? "border-black/70 shadow-[0_10px_35px_rgba(0,0,0,0.12)] bg-white/90"
                    : "border-black/10 hover:border-black/30 bg-white/70"
                )}
                initial={{ width: "4.5rem", height: "30rem" }}
                animate={{
                  width: isActive ? "26rem" : "4.5rem",
                  height: "30rem",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                  mass: 0.75,
                }}
                onClick={() => setActiveImage(index)}
                onHoverStart={() => setActiveImage(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {/* Full-Cover Edge-to-Edge Product Image (0 Black Edges) */}
                <div className="relative w-full h-full overflow-hidden bg-neutral-100 flex items-center justify-center">
                  <motion.img
                    src={image.src}
                    onError={(e) => {
                      if (image.fallback) {
                        (e.target as HTMLImageElement).src = image.fallback;
                      }
                    }}
                    animate={{
                      scale: isActive ? 1.04 : 1,
                      opacity: isActive ? 1 : 0.65,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 26,
                    }}
                    className="w-full h-full object-cover object-center pointer-events-none transform-gpu"
                    alt={image.alt}
                    loading="lazy"
                  />

                  {/* Active Card Gradient Overlay */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Active Module Info Bottom Bar (Professional Typography) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 14 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                      }}
                      className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-white/95 backdrop-blur-md border-t border-black/10 pointer-events-none flex flex-col items-start justify-end shadow-lg"
                    >
                      <span className="text-xs font-mono text-neutral-600 font-semibold tracking-widest uppercase">
                        {image.code}
                      </span>
                      {image.title && (
                        <h3 className="text-xl font-sans font-extrabold text-black mt-0.5 tracking-tight">
                          {image.title}
                        </h3>
                      )}
                      <p className="text-sm sm:text-base font-sans text-neutral-700 mt-1 leading-relaxed line-clamp-2 font-normal tracking-wide">
                        {image.alt}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Inactive Vertical Label */}
                {!isActive && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-2 pointer-events-none">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase rotate-[-90deg] whitespace-nowrap font-bold">
                      {image.code}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HoverExpandGallery;
