"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface ShowcaseEnvironment {
  id: "gaming" | "cinema" | "desk";
  index: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  displaySpec: string;
  modeLabel: string;
  fieldLabel: string;
  accentColor: string;
  glowClass: string;
}

const ENVIRONMENTS: ShowcaseEnvironment[] = [
  {
    id: "gaming",
    index: "01",
    tag: "GAMING",
    title: "THE BATTLESTATION",
    headline: "THE SCREEN EXTENDS INTO THE PERIPHERY.",
    description:
      "A focused gaming environment where ambient light extends the visual field beyond the monitor. High-contrast in-game action expands past the bezel, immersing your peripheral vision without distracting from the crosshair.",
    displaySpec: "CURVED ULTRAWIDE",
    modeLabel: "FAST-PACED GAMING",
    fieldLabel: "PERIPHERAL EXPANSION",
    accentColor: "#00E5FF",
    glowClass: "from-cyan-500/25 via-blue-600/15 to-transparent",
  },
  {
    id: "cinema",
    index: "02",
    tag: "CINEMA",
    title: "THE HOME THEATER",
    headline: "A THEATER EXPERIENCE AT ROOM SCALE.",
    description:
      "A cinematic environment designed to extend the screen experience into the surrounding room. Film sequences cast natural, coordinated atmospheric illumination across the back wall, dissolving the screen boundary into dark room architecture.",
    displaySpec: "LARGE FORMAT 16:9",
    modeLabel: "CINEMA CADENCE",
    fieldLabel: "WALL-SCALE AMBIENCE",
    accentColor: "#F59E0B",
    glowClass: "from-amber-500/25 via-orange-600/15 to-transparent",
  },
  {
    id: "desk",
    index: "03",
    tag: "DESK",
    title: "THE AMBIENT SETUP",
    headline: "BALANCED LIGHT FOR EXTENDED SESSIONS.",
    description:
      "A restrained desktop environment where the lighting becomes part of the workspace atmosphere. Natural bias illumination reduces visual fatigue during late hours while creating a calm, deliberate working environment.",
    displaySpec: "DUAL DISPLAY WORKSPACE",
    modeLabel: "BIAS ILLUMINATION",
    fieldLabel: "ARCHITECTURAL BALANCE",
    accentColor: "#E2E8F0",
    glowClass: "from-slate-200/20 via-sky-300/10 to-transparent",
  },
];

// ─── Environment Visual Components (SVG & CSS Vector Physical Representations) ───

function GamingVisual() {
  return (
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] md:min-h-[480px] bg-[#050608] flex items-center justify-center overflow-hidden select-none">
      {/* Wall Surface Texture / Tech Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Atmospheric Ambient Light Glow Behind Display */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[92%] max-w-[840px] h-[72%] rounded-full bg-cyan-400/[0.18] blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-[24%] left-1/2 -translate-x-1/2 w-[76%] max-w-[640px] h-[60%] rounded-full bg-blue-600/[0.14] blur-[60px] sm:blur-[90px] pointer-events-none" />

      {/* Desk Surface Horizon Line & Ambient Reflection */}
      <div className="absolute bottom-0 inset-x-0 h-[28%] bg-gradient-to-t from-[#070709] via-[#090a0f] to-transparent border-t border-white/[0.05]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] max-w-[700px] h-12 bg-cyan-400/[0.08] rounded-full blur-[35px]" />
        {/* Subtle desk mat silhouette */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] max-w-[500px] h-[2px] bg-white/[0.08] rounded-full" />
      </div>

      {/* Physical Curved Ultrawide Display Rig */}
      <div className="relative z-10 w-[88%] max-w-[740px] aspect-[21/9] flex flex-col items-center">
        {/* Bezel Frame */}
        <div className="relative w-full h-full rounded-sm border border-white/[0.18] bg-[#090b12] shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-center">
          {/* Specular Edge Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

          {/* Minimalist Game Environment Abstract Vectors */}
          <svg
            viewBox="0 0 740 317"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover opacity-85"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a101f" />
                <stop offset="100%" stopColor="#04060a" />
              </linearGradient>
              <linearGradient id="cyberGrid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="740" height="317" fill="url(#skyGrad)" />
            {/* Horizon mountain vectors */}
            <polyline
              points="0,220 140,160 220,190 320,130 430,200 560,140 680,210 740,180 740,317 0,317"
              fill="#060913"
            />
            <polyline
              points="0,220 140,160 220,190 320,130 430,200 560,140 680,210 740,180"
              stroke="rgba(0,229,255,0.4)"
              strokeWidth="1"
            />
            {/* Minimal perspective ground grid */}
            {[180, 210, 240, 270, 300].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="740"
                y2={y}
                stroke="rgba(0,229,255,0.08)"
                strokeWidth="0.75"
              />
            ))}
            {/* Crosshair / Reticle */}
            <circle
              cx="370"
              cy="158"
              r="14"
              stroke="rgba(0,229,255,0.5)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <line x1="370" y1="140" x2="370" y2="148" stroke="#00E5FF" strokeWidth="1" />
            <line x1="370" y1="168" x2="370" y2="176" stroke="#00E5FF" strokeWidth="1" />
            <line x1="352" y1="158" x2="360" y2="158" stroke="#00E5FF" strokeWidth="1" />
            <line x1="380" y1="158" x2="388" y2="158" stroke="#00E5FF" strokeWidth="1" />
          </svg>

          {/* Screen HUD Overlay */}
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-400 uppercase">
              SYNC ACTIVE
            </span>
          </div>
          <div className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            21:9 ULTRAWIDE
          </div>
        </div>

        {/* Display Stand Neck & Base */}
        <div className="w-6 h-4 bg-neutral-800 border-x border-white/10" />
        <div className="w-32 h-1.5 bg-neutral-800 rounded-b-sm border border-t-0 border-white/15" />
      </div>
    </div>
  );
}

function CinemaVisual() {
  return (
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] md:min-h-[480px] bg-[#050608] flex items-center justify-center overflow-hidden select-none">
      {/* Wall Surface Texture */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-900/10 via-transparent to-transparent opacity-40" />

      {/* Warm Golden/Amber Ambient Glow Behind Large Screen */}
      <div className="absolute top-[14%] left-1/2 -translate-x-1/2 w-[95%] max-w-[880px] h-[78%] rounded-full bg-amber-500/[0.18] blur-[90px] sm:blur-[135px] pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80%] max-w-[700px] h-[65%] rounded-full bg-orange-600/[0.12] blur-[70px] sm:blur-[105px] pointer-events-none" />

      {/* Media Console Surface & Warm Light Spill */}
      <div className="absolute bottom-0 inset-x-0 h-[26%] bg-gradient-to-t from-[#070709] via-[#0a0806] to-transparent border-t border-white/[0.04]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] max-w-[720px] h-14 bg-amber-500/[0.09] rounded-full blur-[40px]" />
      </div>

      {/* Large Cinema 16:9 Panel */}
      <div className="relative z-10 w-[82%] max-w-[680px] aspect-[16/9] flex flex-col items-center">
        <div className="relative w-full h-full rounded-sm border border-white/[0.16] bg-[#070605] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-center">
          {/* Top Glass Reflection */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />

          {/* Cinema Frame — 2.39:1 Letterbox Content Inside 16:9 Frame */}
          <div className="w-full h-[76%] bg-[#0f0b07] relative overflow-hidden flex items-center justify-center">
            {/* Subtle Abstract Golden Sunset Cinema Vector Scene */}
            <svg
              viewBox="0 0 680 286"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-cover opacity-80"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="cinemaSun" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a1608" />
                  <stop offset="50%" stopColor="#4a2208" />
                  <stop offset="100%" stopColor="#120803" />
                </linearGradient>
              </defs>
              <rect width="680" height="286" fill="url(#cinemaSun)" />
              {/* Sun disk */}
              <circle cx="340" cy="140" r="46" fill="#F59E0B" fillOpacity="0.25" />
              <circle cx="340" cy="140" r="28" fill="#FBBF24" fillOpacity="0.4" />
              {/* Architectural dune silhouette */}
              <path
                d="M0,210 Q180,170 340,195 T680,180 L680,286 L0,286 Z"
                fill="#0a0502"
              />
              <path
                d="M0,230 Q240,200 480,225 T680,210 L680,286 L0,286 Z"
                fill="#050301"
              />
            </svg>

            {/* Letterbox Bar Edge Hairlines */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/[0.08]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.08]" />
          </div>

          {/* Letterbox Black Bars */}
          <div className="absolute top-0 inset-x-0 h-[12%] bg-black flex items-center px-4">
            <span className="font-mono text-[8px] tracking-[0.25em] text-white/30 uppercase">
              CINEMATIC PROJECTION
            </span>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-[12%] bg-black flex items-center justify-end px-4">
            <span className="font-mono text-[8px] tracking-[0.2em] text-amber-400/60 uppercase">
              24P HDR COLOR PROFILE
            </span>
          </div>
        </div>

        {/* Floating Low-profile wall bracket silhouette */}
        <div className="w-16 h-1 bg-white/10 mt-1 rounded-full" />
      </div>
    </div>
  );
}

function DeskVisual() {
  return (
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] md:min-h-[480px] bg-[#050608] flex items-center justify-center overflow-hidden select-none">
      {/* Wall Neutral Bias Backlight */}
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] h-[72%] rounded-full bg-white/[0.12] blur-[85px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[74%] max-w-[620px] h-[58%] rounded-full bg-slate-300/[0.08] blur-[65px] sm:blur-[95px] pointer-events-none" />

      {/* Desk Surface & Clean Neutral Light Spill */}
      <div className="absolute bottom-0 inset-x-0 h-[26%] bg-gradient-to-t from-[#070709] via-[#090b10] to-transparent border-t border-white/[0.05]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[680px] h-12 bg-white/[0.06] rounded-full blur-[35px]" />
        {/* Desk edge outline */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[70%] max-w-[560px] h-[1px] bg-white/[0.08]" />
      </div>

      {/* Minimalist Dual Setup / Main Workspace Display */}
      <div className="relative z-10 w-[84%] max-w-[700px] aspect-[16/10] flex flex-col items-center">
        <div className="relative w-full h-full rounded-sm border border-white/[0.18] bg-[#0a0c14] shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-center">
          {/* Top Edge Specular */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Abstract Editorial Design Workspace Vector Wireframe */}
          <svg
            viewBox="0 0 700 437"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover opacity-80"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="deskBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d111a" />
                <stop offset="100%" stopColor="#07090e" />
              </linearGradient>
            </defs>
            <rect width="700" height="437" fill="url(#deskBg)" />
            {/* Wireframe document canvas */}
            <rect
              x="80"
              y="50"
              width="540"
              height="337"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              fill="rgba(255,255,255,0.01)"
            />
            {/* Grid structure */}
            <line x1="260" y1="50" x2="260" y2="387" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="80" y1="140" x2="620" y2="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {/* Layout blocks */}
            <rect x="100" y="70" width="140" height="16" fill="rgba(255,255,255,0.15)" />
            <rect x="100" y="98" width="100" height="8" fill="rgba(255,255,255,0.06)" />
            <rect x="280" y="70" width="320" height="50" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x="280" y="160" width="200" height="120" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <rect x="500" y="160" width="100" height="120" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {/* Code / text micro lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="100"
                y1={170 + i * 18}
                x2={100 + (i % 2 === 0 ? 120 : 90)}
                y2={170 + i * 18}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Minimal Status Bar */}
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/60 uppercase">
              6500K BIAS PROFILE
            </span>
          </div>
          <div className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
            CALIBRATED SPECTRUM
          </div>
        </div>

        {/* Minimal Stand */}
        <div className="w-8 h-4 bg-neutral-800 border-x border-white/10" />
        <div className="w-28 h-1.5 bg-neutral-800 rounded-b-sm border border-t-0 border-white/15" />
      </div>
    </div>
  );
}

const VISUAL_COMPONENTS = {
  gaming: GamingVisual,
  cinema: CinemaVisual,
  desk: DeskVisual,
};

// ─── Tilt Container Component (Desktop Subtle 3D Perspective) ─────────────────

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Strict limits: rotateX max ±2°, rotateY max ±3°
    const rotateX = -normY * 2.0;
    const rotateY = normX * 2.8;

    setTransformStyle(
      `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransformStyle("perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 100ms ease-out"
          : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`will-change-transform motion-reduce:transform-none ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Environment Article Card ─────────────────────────────────────────────────

interface EnvironmentArticleProps {
  env: ShowcaseEnvironment;
  isActive: boolean;
  onIntersect?: (id: ShowcaseEnvironment["id"]) => void;
}

function EnvironmentArticle({ env, isActive }: EnvironmentArticleProps) {
  const VisualComponent = VISUAL_COMPONENTS[env.id];

  return (
    <article
      id={`environment-${env.id}`}
      data-env-id={env.id}
      className="group relative flex flex-col border border-white/[0.08] bg-[#0c0d14] rounded-none overflow-hidden transition-colors duration-300 hover:border-white/[0.18]"
      aria-labelledby={`env-title-${env.id}`}
    >
      {/* ── Top Micro-Header Bar ── */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/[0.06] bg-black/40 select-none">
        <div className="flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{ backgroundColor: isActive ? env.accentColor : "rgba(255,255,255,0.25)" }}
          />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/60">
            ENVIRONMENT {"//"} {env.index}
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-white/35">
          <span className="hidden sm:inline">{env.displaySpec}</span>
          <span className="hidden sm:inline text-white/15">|</span>
          <span>{env.tag}</span>
        </div>
      </div>

      {/* ── Visual Surface (65–75% visual weight) with Subtle 3D Tilt ── */}
      <div className="relative w-full overflow-hidden">
        <TiltCard className="w-full h-full">
          <VisualComponent />
        </TiltCard>
      </div>

      {/* ── Bottom Editorial Content & Metadata Strip ── */}
      <div className="p-6 sm:p-8 md:p-10 border-t border-white/[0.06] bg-[#0e1018]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Index & Title */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-2 select-none">
              <span
                className="font-mono text-xs tracking-[0.22em] uppercase transition-colors duration-300"
                style={{ color: env.accentColor }}
              >
                {env.index} {"//"} {env.tag}
              </span>
            </div>
            <h3
              id={`env-title-${env.id}`}
              className="font-sans font-bold uppercase tracking-tight leading-[0.92] text-[#F3F4F6]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              {env.title}
            </h3>
            <div className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-white/30">
              {env.modeLabel}
            </div>
          </div>

          {/* Supporting Description & Technical Note */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed mb-4">
              {env.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/[0.04] font-mono text-[10px] tracking-[0.18em] uppercase text-white/30 select-none">
              <span>FIELD: {env.fieldLabel}</span>
              <span className="text-white/15">•</span>
              <span>SETUP: {env.displaySpec}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Accent Hairline */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
        style={{ backgroundColor: env.accentColor }}
        aria-hidden="true"
      />
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ImmersionShowcase() {
  const [activeEnv, setActiveEnv] = useState<ShowcaseEnvironment["id"]>("gaming");
  const sectionRef = useRef<HTMLElement | null>(null);

  // IntersectionObserver to track which environment is in active scroll view
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const articles = document.querySelectorAll("[data-env-id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-env-id") as ShowcaseEnvironment["id"];
            if (id) setActiveEnv(id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0.2,
      }
    );

    articles.forEach((a) => observer.observe(a));
    return () => observer.disconnect();
  }, []);

  const scrollToEnv = (id: ShowcaseEnvironment["id"]) => {
    const el = document.getElementById(`environment-${id}`);
    if (el) {
      // 96px header offset
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="immersion-action"
      aria-labelledby="immersion-heading"
      ref={sectionRef}
      className="relative w-full bg-[#070709] border-t border-white/[0.08]"
    >
      {/* ── Section Header & Intro ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-20">
        {/* Technical Section Identifier */}
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] mb-8 flex items-center gap-2 select-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF]/60" aria-hidden="true" />
          <span>05 {" // "} IMMERSION IN ACTION</span>
        </div>

        {/* Section Headline & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <h2
              id="immersion-heading"
              className="font-sans font-bold uppercase leading-[0.9] tracking-tight text-[#F3F4F6]"
              style={{ fontSize: "clamp(2.625rem, 8vw, 5.5rem)" }}
            >
              LIGHT
              <br />
              CHANGES
              <br />
              THE ROOM.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="font-sans text-[#F3F4F6] text-base sm:text-lg font-medium leading-relaxed mb-3">
              Three environments. One visual principle.
            </p>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed">
              The display becomes the source. The surrounding space becomes part of
              the experience. Ambient light extends the content field into your
              room architecture.
            </p>
          </div>
        </div>
      </div>

      {/* ── Sticky Environment Quick-Nav Strip (Desktop only) ───────────── */}
      <div className="hidden md:block sticky z-30 top-16 sm:top-20 bg-[#070709]/90 backdrop-blur-md border-y border-white/[0.06] mb-12 sm:mb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            {ENVIRONMENTS.map((env) => {
              const isCurrent = activeEnv === env.id;
              return (
                <button
                  key={env.id}
                  type="button"
                  onClick={() => scrollToEnv(env.id)}
                  className="group flex items-center gap-2.5 py-1 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isCurrent ? env.accentColor : "rgba(255,255,255,0.2)",
                      boxShadow: isCurrent ? `0 0 6px ${env.accentColor}` : "none",
                    }}
                  />
                  <span
                    className="font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-200"
                    style={{
                      color: isCurrent ? "#F3F4F6" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {env.index} {"//"} {env.tag}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20 select-none">
            REAL ENVIRONMENT SIMULATION
          </span>
        </div>
      </div>

      {/* ── Environment Showcase Stream (Vertical Editorial Rhythm) ────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pb-24 sm:pb-32 md:pb-36 space-y-16 sm:space-y-24 md:space-y-28">
        {ENVIRONMENTS.map((env) => (
          <EnvironmentArticle
            key={env.id}
            env={env}
            isActive={activeEnv === env.id}
          />
        ))}

        {/* ── Section Footer Telemetry Strip ── */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] text-white/30 tracking-[0.2em] uppercase select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
            <span>01 GAMING {"//"} 02 CINEMA {"//"} 03 WORKSPACE</span>
          </div>
          <span>END OF SIMULATION</span>
        </div>
      </div>
    </section>
  );
}
