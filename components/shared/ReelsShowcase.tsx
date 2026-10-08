"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface ReelItem {
  id: string;
  filename: string;
  src: string;
  title: string;
  badge?: "FEATURED" | "TOP SELLING" | "TRENDING" | "NEW";
  productTitle: string;
  productSlug: string;
  productImage: string;
}

// Fallback initial reels in case API is loading
const INITIAL_REELS: ReelItem[] = [
  {
    id: "hdmi-sync-tv-backlight",
    filename: "hdmi-sync-tv-backlight.mp4",
    src: "/reels/hdmi-sync-tv-backlight.mp4",
    title: "HDMI Sync TV Backlight",
    badge: "FEATURED",
    productTitle: "HDMI Sync TV Backlight",
    productSlug: "tv-backlight",
    productImage: "/products/tv-backlight/main.png",
  },
  {
    id: "cloud-lights-room-makeover",
    filename: "cloud-lights-room-makeover.mp4",
    src: "/reels/cloud-lights-room-makeover.mp4",
    title: "Cloud Lights Room Makeover",
    badge: "TOP SELLING",
    productTitle: "LightinMotion Cloud Lights",
    productSlug: "cloudlights",
    productImage: "/products/cloudlights/main.jpg",
  },
  {
    id: "monitor-backlight-gaming",
    filename: "monitor-backlight-gaming.mp4",
    src: "/reels/monitor-backlight-gaming.mp4",
    title: "Monitor Backlight Esports",
    badge: "FEATURED",
    productTitle: "Monitor Backlight",
    productSlug: "monitor-backlight",
    productImage: "/products/monitor-backlight/main.png",
  },
  {
    id: "monitor-bar-lights-setup",
    filename: "monitor-bar-lights-setup.mp4",
    src: "/reels/monitor-bar-lights-setup.mp4",
    title: "Dual Screen Bar Lights",
    badge: "TRENDING",
    productTitle: "Monitor Bar Lights",
    productSlug: "bar-lights",
    productImage: "/products/bar-lights/main.png",
  },
  {
    id: "custom-sync-lights-tour",
    filename: "custom-sync-lights-tour.mp4",
    src: "/reels/custom-sync-lights-tour.mp4",
    title: "Custom Strip Ambient Sync",
    badge: "FEATURED",
    productTitle: "Custom Sync Lights",
    productSlug: "custom-strip-light",
    productImage: "/products/custom-strip-light/main.png",
  },
];

export const ReelsShowcase: React.FC<{ className?: string }> = ({ className }) => {
  const [reels, setReels] = useState<ReelItem[]>(INITIAL_REELS);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false); // Audio enabled by default as requested!
  const [volume, setVolume] = useState<number>(1.0);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Fetch dynamically from /api/reels so whatever videos user saves into public/reels/ appear automatically!
  useEffect(() => {
    fetch("/api/reels")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.reels) && data.reels.length > 0) {
          setReels(data.reels);
        }
      })
      .catch(() => {
        // Fallback to INITIAL_REELS
      });
  }, []);

  // Scroll left/right buttons for horizontal carousel
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 420;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Open modal player with full audio enabled
  const openReelModal = (index: number) => {
    setActiveReelIndex(index);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const closeReelModal = () => {
    setActiveReelIndex(null);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  const nextReel = () => {
    if (activeReelIndex !== null) {
      const nextIdx = (activeReelIndex + 1) % reels.length;
      setActiveReelIndex(nextIdx);
      setIsPlaying(true);
    }
  };

  const prevReel = () => {
    if (activeReelIndex !== null) {
      const prevIdx = (activeReelIndex - 1 + reels.length) % reels.length;
      setActiveReelIndex(prevIdx);
      setIsPlaying(true);
    }
  };

  // Synchronize modal video playback & sound
  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.volume = volume;

    if (isPlaying) {
      video.play().catch(() => {
        // Autoplay policy fallback: if browser blocks audio autoplay, user can click to unmute
      });
    } else {
      video.pause();
    }
  }, [isPlaying, isMuted, volume, activeReelIndex]);

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      const current = modalVideoRef.current.currentTime;
      const total = modalVideoRef.current.duration || 1;
      setProgress((current / total) * 100);
      setDuration(total);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalVideoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * modalVideoRef.current.duration;
      modalVideoRef.current.currentTime = newTime;
    }
  };

  const activeReel = activeReelIndex !== null ? reels[activeReelIndex] : null;

  return (
    <section
      className={cn(
        "relative w-full bg-black py-16 sm:py-24 text-white overflow-hidden select-none border-t border-white/10",
        className
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Heading matching reference image: "Watch. Explore. Choose." */}
        <div className="text-center mb-12 sm:mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Watch. Explore. Choose.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono tracking-wider uppercase">
            Real Customer Setups & Zero-Latency Light Shows
          </p>
        </div>

        {/* Carousel Container with Left/Right Arrows */}
        <div className="relative group/carousel">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous reels"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-black shadow-[0_8px_25px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer hover:scale-105"
          >
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next reels"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-black shadow-[0_8px_25px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer hover:scale-105"
          >
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal Reel Cards Scroll Area */}
          <div
            ref={carouselRef}
            className="flex items-center gap-5 sm:gap-6 overflow-x-auto scrollbar-none py-4 px-2 snap-x snap-mandatory scroll-smooth"
          >
            {reels.map((reel, index) => (
              <div
                key={reel.id}
                onClick={() => openReelModal(index)}
                className="relative flex-shrink-0 w-[300px] sm:w-[350px] md:w-[380px] lg:w-[410px] h-[540px] sm:h-[620px] md:h-[680px] rounded-3xl overflow-hidden bg-[#0A0B0E] border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.9)] cursor-pointer group hover:border-white/50 hover:shadow-[0_20px_60px_rgba(150,59,24,0.4)] transition-all duration-300 transform hover:-translate-y-2 snap-start"
              >
                {/* Background Video Loop Preview */}
                <video
                  src={reel.src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay to blend seamlessly with black background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Center Circular Play Button Indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover:scale-115 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE FULL-SCREEN REELS PLAYER WITH AUDIO */}
      {/* ============================================================== */}
      {activeReel && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
          
          {/* Close Backdrop Button */}
          <button
            type="button"
            onClick={closeReelModal}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-xl font-bold cursor-pointer transition-colors shadow-2xl"
          >
            ✕
          </button>

          {/* Previous Reel Navigation Button (desktop) */}
          <button
            type="button"
            onClick={prevReel}
            aria-label="Previous reel"
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Reel Navigation Button (desktop) */}
          <button
            type="button"
            onClick={nextReel}
            aria-label="Next reel"
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Reel Frame Container */}
          <div className="relative w-full max-w-[420px] h-[85vh] max-h-[780px] bg-black rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,1)] flex flex-col justify-between">
            
            {/* Native Video Element WITH FULL AUDIO */}
            <video
              ref={modalVideoRef}
              key={activeReel.src}
              src={activeReel.src}
              autoPlay
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 w-full h-full object-contain bg-black cursor-pointer"
            />

            {/* Top Bar with Audio Controls */}
            <div className="relative z-20 flex items-center justify-end p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">

              {/* Sound / Unmute Button (User explicitly wanted audio!) */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-black/90 border border-white/30 text-xs font-bold text-white transition-colors cursor-pointer shadow-lg"
              >
                {isMuted ? (
                  <>
                    <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    <span>Unmute Audio</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    <span>Sound On</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Controls, Progress Bar & Product Action Pill */}
            <div className="relative z-20 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent space-y-3">
              
              {/* Scrub Progress Bar */}
              <div
                onClick={handleScrub}
                className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
              >
                <div
                  className="h-full bg-[#963b18] transition-all duration-100 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Title & Play/Pause Button */}
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-base font-extrabold font-sans leading-tight">
                    {activeReel.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    LIGHTINMOTION Verified Setup
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Direct "View Product" Action Bar */}
              <div className="pt-1 flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/15">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-neutral-900">
                    <Image
                      src={activeReel.productImage}
                      alt={activeReel.productTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-white truncate font-sans">
                      {activeReel.productTitle}
                    </span>
                    <span className="block text-[10px] text-emerald-400 font-mono">
                      In Stock • Instant Dispatch
                    </span>
                  </div>
                </div>

                <Link
                  href={`/products/${activeReel.productSlug}`}
                  onClick={closeReelModal}
                  className="bg-white hover:bg-neutral-200 text-black font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                >
                  View Product
                </Link>
              </div>
            </div>

          </div>

        </div>
      )}
    </section>
  );
};

export default ReelsShowcase;
