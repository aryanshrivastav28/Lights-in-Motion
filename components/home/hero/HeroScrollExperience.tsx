"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { HeroText } from "./HeroText";
import { HeroMedia } from "./HeroMedia";
import { cn } from "@/lib/utils/cn";

export interface HeroScrollExperienceProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

interface AnimationState {
  currentIndex: number;
  nextIndex: number;
  blend: number;
  isTransitioning: boolean;
}

// ---------------------------------------------------------------------------
// Interaction & Animation Cadence Constants
// ---------------------------------------------------------------------------

const TRANSITION_DURATION = 750; // ms — matches existing 3D camera cadence
const REDUCED_MOTION_DURATION = 250; // ms — reduced-motion accessibility
const SWIPE_THRESHOLD = 45; // px — mobile touch swipe distance
const PAGE_RETURN_SETTLE_MS = 200; // buffer when arriving back at page top

// WHEELEND_TIMEOUT_MS
//   How long after the last wheel event fires before the physical gesture is
//   considered "finished". Prevents trackpad momentum from triggering a second
//   scene change — all events within this window are part of one gesture.
const WHEELEND_TIMEOUT_MS = 380;

// GESTURE_LOCK_DURATION_MS
//   Hard lock that begins when a scene transition triggers. No scene changes
//   are accepted during this window. Must be >= TRANSITION_DURATION so the
//   lock expires only after the 3D animation completes (+ 80ms buffer).
const GESTURE_LOCK_DURATION_MS = TRANSITION_DURATION + 80;

// DELTA_CLAMP
//   Cap per wheel event contribution. High-DPI mice can produce huge per-event
//   deltas; clamping prevents a single event from overshooting the threshold.
const DELTA_CLAMP = 80;

// SCROLL_THRESHOLD
//   Total accumulated (clamped) delta required to accept one scroll intent.
const SCROLL_THRESHOLD = 80;

// ---------------------------------------------------------------------------

const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const HeroScrollExperience: React.FC<HeroScrollExperienceProps> = ({
  className,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);

  const [animState, setAnimState] = useState<AnimationState>({
    currentIndex: 0,
    nextIndex: 0,
    blend: 0,
    isTransitioning: false,
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // ── Mutable interaction state (never trigger re-renders) ──────────────────
  const activeSceneRef = useRef<number>(0);

  // True while the transition RAF loop is running
  const isTransitioningRef = useRef<boolean>(false);

  // performance.now() timestamp: no transitions accepted before this time
  const gestureLockUntilRef = useRef<number>(0);

  // Accumulated (clamped) wheel delta for the current gesture
  const accumulatedDeltaRef = useRef<number>(0);

  // Direction of accumulated delta (+1 down, -1 up, 0 unset)
  const accDirectionRef = useRef<number>(0);

  // ID of the wheelend settle timer
  const wheelEndTimerRef = useRef<number | null>(null);

  // Set to true when a gesture triggers a scene change; cleared only when
  // the wheelend timer fires. Guards against momentum-tail events.
  const gestureConsumedRef = useRef<boolean>(false);

  // Track when page scrolls past the Hero into lower sections
  const lastPageScrollTimeRef = useRef<number>(0);

  // RAF id for the animation step loop
  const rafIdRef = useRef<number | null>(null);

  // Touch state
  const touchStartYRef = useRef<number>(0);
  const touchStartXRef = useRef<number>(0);
  const touchTriggeredRef = useRef<boolean>(false);

  // Ref copy of prefersReducedMotion for use inside callbacks without deps
  const prefersReducedMotionRef = useRef<boolean>(false);

  // ── Discrete Scene Transition Execution ──────────────────────────────────
  //
  // Visually identical to the original — same RAF loop, same easeInOutCubic,
  // same blend values fed into HeroText and HeroMedia. Only the lock
  // acquisition has changed to use the new gestureConsumedRef / gestureLockUntilRef.
  const triggerTransition = useCallback(
    (fromScene: number, toScene: number) => {
      if (fromScene === toScene) return;
      if (isTransitioningRef.current) return;

      const clampedTarget = Math.max(0, Math.min(5, toScene));
      if (clampedTarget === fromScene) return;

      // Acquire locks
      isTransitioningRef.current = true;
      gestureLockUntilRef.current = performance.now() + GESTURE_LOCK_DURATION_MS;
      gestureConsumedRef.current = true;
      activeSceneRef.current = clampedTarget;
      accumulatedDeltaRef.current = 0;
      accDirectionRef.current = 0;

      const isForward = clampedTarget > fromScene;
      const cIdx = isForward ? fromScene : clampedTarget;
      const nIdx = isForward ? clampedTarget : fromScene;
      // Use ref copy to avoid stale closure on prefersReducedMotion state
      const duration = prefersReducedMotionRef.current
        ? REDUCED_MOTION_DURATION
        : TRANSITION_DURATION;
      const startTime = performance.now();

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutCubic(progress);
        const blend = isForward ? eased : 1 - eased;

        if (progress < 1) {
          setAnimState({
            currentIndex: cIdx,
            nextIndex: nIdx,
            blend,
            isTransitioning: true,
          });
          rafIdRef.current = requestAnimationFrame(step);
        } else {
          // Transition complete: settle into final target scene
          setAnimState({
            currentIndex: clampedTarget,
            nextIndex: clampedTarget,
            blend: 0,
            isTransitioning: false,
          });
          isTransitioningRef.current = false;
          rafIdRef.current = null;
          // gestureConsumedRef stays true until the wheelend timer fires —
          // this prevents trackpad momentum tail events from triggering another
          // scene change immediately after the animation settles.
        }
      };

      rafIdRef.current = requestAnimationFrame(step);
    },
    [] // refs only — no stale closure risk
  );

  // ── Wheel-End Timeout ─────────────────────────────────────────────────────
  //
  // Resets per-gesture state WHEELEND_TIMEOUT_MS after the last wheel event.
  // This is the core mechanism that prevents trackpad momentum from triggering
  // a second scene: as long as momentum events keep arriving, the timer resets.
  // Once the gesture is truly over (no events for WHEELEND_TIMEOUT_MS), the
  // flag clears and the next deliberate gesture can begin accumulating.
  const scheduleWheelEnd = useCallback(() => {
    if (wheelEndTimerRef.current !== null) {
      clearTimeout(wheelEndTimerRef.current);
    }
    wheelEndTimerRef.current = window.setTimeout(() => {
      accumulatedDeltaRef.current = 0;
      accDirectionRef.current = 0;
      gestureConsumedRef.current = false;
      wheelEndTimerRef.current = null;
    }, WHEELEND_TIMEOUT_MS);
  }, []);

  // ── Wheel / Trackpad Scroll-Intent Controller ─────────────────────────────
  //
  // Three-layer protection against multi-scene skipping:
  //   Layer 1 — gestureLockUntilRef: hard timestamp lock for GESTURE_LOCK_DURATION_MS
  //             from the moment a transition fires (covers animation + buffer).
  //   Layer 2 — gestureConsumedRef: once a scene change is triggered, all
  //             subsequent events from the same physical gesture are discarded
  //             until the wheelend timer fires (WHEELEND_TIMEOUT_MS idle).
  //   Layer 3 — DELTA_CLAMP + SCROLL_THRESHOLD: even without the above guards,
  //             a single event cannot alone overshoot the threshold.
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const now = performance.now();

      // 1. If page is scrolled past the Hero into lower sections, release
      //    completely to native scrolling and reset gesture state.
      if (window.scrollY > 2) {
        lastPageScrollTimeRef.current = now;
        accumulatedDeltaRef.current = 0;
        accDirectionRef.current = 0;
        gestureConsumedRef.current = false;
        if (wheelEndTimerRef.current !== null) {
          clearTimeout(wheelEndTimerRef.current);
          wheelEndTimerRef.current = null;
        }
        return;
      }

      // 2. Buffer when the user scrolls back up to the Hero from below
      if (now - lastPageScrollTimeRef.current < PAGE_RETURN_SETTLE_MS) {
        accumulatedDeltaRef.current = 0;
        return;
      }

      const currentScene = activeSceneRef.current;
      const rawDelta = e.deltaY;

      // 3. Boundary releases — let native scroll handle exits at scene edges.
      //
      // IMPORTANT: we set gestureConsumedRef = true and call scheduleWheelEnd()
      // here instead of clearing gestureConsumedRef. This is the fix for the
      // Scene-6 upward-scroll bug.
      //
      // Without this, clearing gestureConsumedRef immediately at the boundary
      // leaves the controller "open" to residual momentum events. Trackpads
      // in particular can emit small upward-direction events during deceleration
      // of a downward swipe. Those would accumulate negative delta and trigger
      // a backward 5→4 transition — causing the visible upward Hero movement.
      //
      // By keeping gestureConsumedRef = true and scheduling the wheelend timer,
      // we absorb all tail events from the same physical gesture. The 380ms idle
      // timer then clears the flag cleanly for the next deliberate gesture.
      if (currentScene === 0 && rawDelta < 0) {
        // Scene 1 + scroll UP → release to native page scroll
        accumulatedDeltaRef.current = 0;
        accDirectionRef.current = 0;
        gestureConsumedRef.current = true; // suppress residual momentum
        scheduleWheelEnd();               // clear after 380ms idle
        return;                           // no preventDefault → native scroll
      }
      if (currentScene === 5 && rawDelta > 0) {
        // Scene 6 + scroll DOWN → release to native page scroll
        accumulatedDeltaRef.current = 0;
        accDirectionRef.current = 0;
        gestureConsumedRef.current = true; // suppress residual momentum
        scheduleWheelEnd();               // clear after 380ms idle
        return;                           // no preventDefault → native scroll
      }

      // We are inside the Hero interaction zone — intercept the wheel event
      e.preventDefault();

      // 4. Hard gesture lock: reject all input during the lock window.
      //    This covers the full animation duration (750ms) + 80ms buffer.
      if (now < gestureLockUntilRef.current) {
        scheduleWheelEnd();
        return;
      }

      // 5. Gesture-consumed guard: a scene change was already triggered by
      //    this physical gesture. Discard until the wheelend timer fires.
      if (gestureConsumedRef.current) {
        scheduleWheelEnd();
        return;
      }

      // 6. Defensive: transition RAF still running (should not happen outside
      //    the lock window, but guards against edge cases).
      if (isTransitioningRef.current) {
        scheduleWheelEnd();
        return;
      }

      // 7. Reschedule the wheelend timer on every event so it only fires
      //    after WHEELEND_TIMEOUT_MS of complete silence from the wheel.
      scheduleWheelEnd();

      // 8. Clamp per-event delta: prevents a single large event (e.g. high-DPI
      //    mouse at max speed) from over-contributing to the accumulator.
      const clampedDelta =
        Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), DELTA_CLAMP);

      // 9. Direction-change reset: if the user reverses scroll direction,
      //    discard any accumulated intent from the previous direction.
      const newDirection = Math.sign(clampedDelta);
      if (accDirectionRef.current !== 0 && newDirection !== accDirectionRef.current) {
        accumulatedDeltaRef.current = 0;
      }
      accDirectionRef.current = newDirection;

      // 10. Accumulate
      accumulatedDeltaRef.current += clampedDelta;

      // 11. Threshold check — advance or retreat exactly ONE scene
      if (accumulatedDeltaRef.current >= SCROLL_THRESHOLD) {
        if (currentScene < 5) {
          triggerTransition(currentScene, currentScene + 1);
        }
        accumulatedDeltaRef.current = 0;
      } else if (accumulatedDeltaRef.current <= -SCROLL_THRESHOLD) {
        if (currentScene > 0) {
          triggerTransition(currentScene, currentScene - 1);
        }
        accumulatedDeltaRef.current = 0;
      }
    },
    [triggerTransition, scheduleWheelEnd]
  );

  // Mobile Touch Swipe Handling
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
      touchTriggeredRef.current = false;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      if (window.scrollY > 2) return;

      const currentScene = activeSceneRef.current;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const diffY = touchStartYRef.current - currentY; // positive = swipe up = scroll down
      const diffX = touchStartXRef.current - currentX;

      if (Math.abs(diffY) > Math.abs(diffX)) {
        // Boundaries release to native mobile scrolling
        if (currentScene === 0 && diffY < 0) {
          return;
        }
        if (currentScene === 5 && diffY > 0) {
          return;
        }

        if (e.cancelable) {
          e.preventDefault();
        }

        // Single scene transition per physical swipe contact
        if (!touchTriggeredRef.current && !isTransitioningRef.current) {
          if (diffY >= SWIPE_THRESHOLD && currentScene < 5) {
            touchTriggeredRef.current = true;
            triggerTransition(currentScene, currentScene + 1);
          } else if (diffY <= -SWIPE_THRESHOLD && currentScene > 0) {
            touchTriggeredRef.current = true;
            triggerTransition(currentScene, currentScene - 1);
          }
        }
      }
    },
    [triggerTransition]
  );

  const handleTouchEnd = useCallback(() => {
    touchTriggeredRef.current = false;
  }, []);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialReducedMotion = mediaReducedMotion.matches;
    setPrefersReducedMotion(initialReducedMotion);
    prefersReducedMotionRef.current = initialReducedMotion;

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      prefersReducedMotionRef.current = e.matches;
    };

    const handleWindowScroll = () => {
      if (window.scrollY > 2) {
        lastPageScrollTimeRef.current = performance.now();
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    mediaReducedMotion.addEventListener("change", onMotionChange);

    const stage = stageRef.current;
    if (stage) {
      stage.addEventListener("wheel", handleWheel, { passive: false });
      stage.addEventListener("touchstart", handleTouchStart, { passive: true });
      stage.addEventListener("touchmove", handleTouchMove, { passive: false });
      stage.addEventListener("touchend", handleTouchEnd, { passive: true });
      stage.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("scroll", handleWindowScroll);
      mediaReducedMotion.removeEventListener("change", onMotionChange);
      if (stage) {
        stage.removeEventListener("wheel", handleWheel);
        stage.removeEventListener("touchstart", handleTouchStart);
        stage.removeEventListener("touchmove", handleTouchMove);
        stage.removeEventListener("touchend", handleTouchEnd);
        stage.removeEventListener("touchcancel", handleTouchEnd);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (wheelEndTimerRef.current !== null) {
        clearTimeout(wheelEndTimerRef.current);
      }
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={stageRef}
      className={cn(
        "relative w-full h-[100svh] overflow-hidden bg-[#F4F1EA] flex flex-col justify-between select-none",
        className
      )}
    >
      {/* Top subtle canvas lighting glow */}
      <div
        className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-radial from-[#1687FF]/[0.035] via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Responsive Split Stage */}
      <div className="relative z-10 w-full h-full max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-0">
        {/* Editorial Text Column (Desktop: Left ~40% | Mobile: Top ~30%) */}
        <div className="w-full md:w-[44%] lg:w-[38%] shrink-0 flex flex-col justify-center py-4 md:py-0 z-20">
          <HeroText
            currentIndex={animState.currentIndex}
            nextIndex={animState.nextIndex}
            blend={animState.blend}
            isTransitioning={animState.isTransitioning}
          />
        </div>

        {/* 3D Cinematic Media Stage (Desktop: Right ~60% | Mobile: Bottom ~70%) */}
        <div className="w-full md:w-[56%] lg:w-[62%] h-[52svh] sm:h-[58svh] md:h-full flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-12 z-10">
          <HeroMedia
            currentIndex={animState.currentIndex}
            nextIndex={animState.nextIndex}
            blend={animState.blend}
            isTransitioning={animState.isTransitioning}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>

      {/* Bottom Architectural Grounding Bar */}
      <div className="relative z-20 w-full pb-4 sm:pb-6 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[rgba(17,18,20,0.08)] bg-gradient-to-t from-[#F4F1EA] via-[#F4F1EA]/90 to-transparent">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#6B6D70]">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1687FF]" />
            LIGHT IN MOTION // CINEMATIC CORE
          </span>
          <span className="hidden sm:inline-block">
            ACTIVE OPTICAL TRANSFORMATION
          </span>
          <span>
            REAL-TIME SYNC
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroScrollExperience;
