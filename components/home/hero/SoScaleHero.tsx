"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValueEvent, MotionValue } from "framer-motion";

export interface SoScaleHeroProps {
  scrollYProgress?: MotionValue<number>;
}

export const SoScaleHero: React.FC<SoScaleHeroProps> = ({ scrollYProgress }) => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  useEffect(() => {
    // Initial page load entrance animation
    const timer = setTimeout(() => {
      setIsRevealed(true);
      setHasEntered(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Listen to scroll progress to reverse animation on scroll down, and forward on scroll up
  useMotionValueEvent(scrollYProgress || (({ get: () => 0, onChange: () => () => {} } as unknown) as MotionValue<number>), "change", (latest) => {
    if (!hasEntered) return;
    
    if (latest > 0.12 && isRevealed) {
      setIsRevealed(false); // Reverses: 'IGHTINMOTION' folds back, 'L' slides back to center
    } else if (latest <= 0.12 && !isRevealed) {
      setIsRevealed(true); // Forwards: 'L' shifts left, 'IGHTINMOTION' unfolds
    }
  });

  return (
    <div className="relative w-full h-full min-h-[100svh] bg-black text-white select-none overflow-hidden flex flex-col items-center justify-center">
      {/* Solid Dark Matte Background */}
      <div className="absolute inset-0 z-0 bg-black pointer-events-none" />

      {/* Main Logo Container */}
      <div className="relative z-10 flex items-center justify-center w-full px-4 text-center">
        <div className="inline-flex items-center justify-center max-w-full py-3">
          {/* Animated Letter 'L' */}
          <motion.span
            layout
            transition={{
              type: "spring",
              stiffness: 55,
              damping: 16,
              mass: 1.5,
            }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11.5vw] font-black tracking-tighter leading-none text-white shrink-0 font-sans transform-gpu antialiased"
          >
            L
          </motion.span>

          {/* Unfolding Remaining Letters 'IGHTINMOTION' */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isRevealed ? "auto" : 0,
              opacity: isRevealed ? 1 : 0,
            }}
            transition={{
              duration: isRevealed ? 1.8 : 1.2,
              ease: [0.16, 1, 0.3, 1], // Smooth cubic ease
              opacity: { duration: isRevealed ? 1.4 : 0.8, delay: isRevealed ? 0.2 : 0 },
            }}
            className="overflow-hidden flex items-center whitespace-nowrap shrink-0 py-3"
          >
            <motion.span
              initial={{ x: -40, opacity: 0 }}
              animate={{
                x: isRevealed ? 0 : -40,
                opacity: isRevealed ? 1 : 0,
              }}
              transition={{
                duration: isRevealed ? 1.6 : 1.0,
                ease: [0.16, 1, 0.3, 1],
                delay: isRevealed ? 0.15 : 0,
              }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[11.5vw] font-black tracking-tighter leading-none text-white font-sans transform-gpu antialiased"
            >
              IGHTINMOTION
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SoScaleHero;
