/**
 * Hero Cinematic Sequence Definitions
 * Light in Motion — Phase 1
 */

export interface Transform3D {
  x: number; // percentage or px
  xUnit?: '%' | 'px';
  y: number;
  yUnit?: '%' | 'px';
  z: number; // px
  rotateX: number; // deg
  rotateY: number; // deg
  scale: number;
  opacity: number;
}

export interface HeroState {
  id: string;
  index: number;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  alt: string;
  entry: Transform3D;
  exit: Transform3D;
}

/**
 * Configurable safety / reassurance video destination.
 * Can be updated later to a full URL without changing component logic.
 */
export const SAFETY_VIDEO_URL = "#safety-overview";

export const HERO_STATES: HeroState[] = [
  {
    id: "setup",
    index: 0,
    image: "/image-library/how-it-works/1.webp",
    title: "IS THIS YOUR SETUP?",
    subtitle: "Ordinary display. Zero immersion. Light stops at the bezel.",
    badge: "ORDINARY DISPLAY // ZERO EXPANSION",
    alt: "Current unlit gaming desk setup with black borders and no ambient lighting",
    entry: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
    },
    exit: {
      x: -15,
      xUnit: '%',
      y: -5,
      yUnit: '%',
      z: -280,
      rotateX: -2,
      rotateY: -10,
      scale: 0.9,
      opacity: 0,
    },
  },
  {
    id: "transformation",
    index: 1,
    image: "/image-library/how-it-works/2.webp",
    title: "IT COULD LOOK LIKE THIS.",
    subtitle: "Real-time reactive light expands your display into the room.",
    badge: "OPTICAL FIELD EXPANSION // WOW MOMENT",
    alt: "Transformed gaming setup illuminated with dynamic ambient backlighting matched to screen content",
    entry: {
      x: 85,
      xUnit: '%',
      y: -28,
      yUnit: '%',
      z: 320,
      rotateX: -6,
      rotateY: 18,
      scale: 1.15,
      opacity: 0,
    },
    exit: {
      x: -80,
      xUnit: '%',
      y: 0,
      yUnit: '%',
      z: -380,
      rotateX: 0,
      rotateY: 15,
      scale: 0.85,
      opacity: 0,
    },
  },
  {
    id: "plug-in",
    index: 2,
    image: "/image-library/how-it-works/3.webp",
    title: "PLUG IN.",
    subtitle: "Zero-latency HDMI 2.1 optical processing unit.",
    badge: "PHYSICAL ARCHITECTURE // DIRECT OPTICAL INTERFACE",
    alt: "Light in Motion optical sync hardware unit being connected to display interface",
    entry: {
      x: 65,
      xUnit: '%',
      y: 75,
      yUnit: '%',
      z: 240,
      rotateX: 12,
      rotateY: -14,
      scale: 1.1,
      opacity: 0,
    },
    exit: {
      x: -70,
      xUnit: '%',
      y: -65,
      yUnit: '%',
      z: -240,
      rotateX: -10,
      rotateY: 8,
      scale: 0.9,
      opacity: 0,
    },
  },
  {
    id: "connect",
    index: 3,
    image: "/image-library/how-it-works/4.webp",
    title: "CONNECT.",
    subtitle: "Instant optical synchronization across your entire ecosystem.",
    badge: "DEVICE SYNC // 240HZ ZERO-LATENCY PROTOCOL",
    alt: "Real-time optical sync device connecting with gaming monitors and smart ecosystem",
    entry: {
      x: 0,
      xUnit: '%',
      y: 85,
      yUnit: '%',
      z: 260,
      rotateX: -15,
      rotateY: 0,
      scale: 1.08,
      opacity: 0,
    },
    exit: {
      x: 85,
      xUnit: '%',
      y: 0,
      yUnit: '%',
      z: -180,
      rotateX: 0,
      rotateY: -12,
      scale: 0.9,
      opacity: 0,
    },
  },
  {
    id: "configure",
    index: 4,
    image: "/image-library/how-it-works/5.webp",
    title: "CONFIGURE.",
    subtitle: "Fine-tune color profiles, brightness curves, and active zones.",
    badge: "SOFTWARE CONTROL // AMBIENT TUNING",
    alt: "Light in Motion desktop and mobile configuration software interface",
    entry: {
      x: 75,
      xUnit: '%',
      y: -75,
      yUnit: '%',
      z: 220,
      rotateX: 10,
      rotateY: 15,
      scale: 1.1,
      opacity: 0,
    },
    exit: {
      x: -80,
      xUnit: '%',
      y: -55,
      yUnit: '%',
      z: -320,
      rotateX: -10,
      rotateY: 12,
      scale: 0.9,
      opacity: 0,
    },
  },
  {
    id: "enjoy",
    index: 5,
    image: "/image-library/how-it-works/6.webp",
    title: "SIT BACK.\nENJOY.",
    subtitle: "The display disappears. Only the cinema remains.",
    badge: "FINAL IMMERSION // THE PAYOFF",
    alt: "Complete living room and theater immersion with wall-to-wall synchronized ambient lighting",
    entry: {
      x: 70,
      xUnit: '%',
      y: 70,
      yUnit: '%',
      z: 260,
      rotateX: 10,
      rotateY: -12,
      scale: 1.1,
      opacity: 0,
    },
    exit: {
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
    },
  },
];
