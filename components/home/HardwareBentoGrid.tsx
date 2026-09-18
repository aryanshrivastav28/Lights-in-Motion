"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Module Data ──────────────────────────────────────────────────────────────
// All descriptions are conceptual. No numerical specifications are claimed.

const MODULES = [
  {
    id: "optical-output",
    index: "01",
    title: "OPTICAL OUTPUT",
    description:
      "Light in Motion is built around a controlled light source designed to produce a continuous, smooth ambient field rather than discrete point illumination.",
    annotation: "LIGHT SOURCE",
    isPrimary: true,
  },
  {
    id: "control-system",
    index: "02",
    title: "CONTROL SYSTEM",
    description:
      "A dedicated control layer coordinates the lighting response across the ambient array, translating interpreted signal data into physical light output.",
    annotation: "CONTROL",
    isPrimary: false,
  },
  {
    id: "signal-processing",
    index: "03",
    title: "SIGNAL PROCESSING",
    description:
      "The signal layer reads and interprets visual information from the display source, preparing it for translation into the ambient lighting system.",
    annotation: "SIGNAL",
    isPrimary: false,
  },
  {
    id: "diffusion",
    index: "04",
    title: "DIFFUSION",
    description:
      "Controlled optical diffusion softens the output and distributes light across the ambient field, reducing harshness and improving the sense of spatial continuity.",
    annotation: "DIFFUSION",
    isPrimary: false,
  },
  {
    id: "environment",
    index: "05",
    title: "ENVIRONMENT",
    description:
      "The complete system is designed to extend the perceived visual field beyond the display boundary into the surrounding environment.",
    annotation: "OUTPUT",
    isPrimary: false,
  },
] as const;

// ─── Primary Visual — Light Bar / Optical Field Diagram ───────────────────────

function OpticalFieldDiagram() {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── Ambient field zones (concentric, low opacity) ── */}
      {/* Outermost */}
      <ellipse cx="240" cy="152" rx="210" ry="68"
        fill="none" stroke="rgba(0,229,255,0.04)" strokeWidth="1" />
      <ellipse cx="240" cy="152" rx="172" ry="52"
        fill="none" stroke="rgba(0,229,255,0.05)" strokeWidth="1" />
      <ellipse cx="240" cy="152" rx="132" ry="38"
        fill="none" stroke="rgba(0,229,255,0.07)" strokeWidth="1" />
      <ellipse cx="240" cy="152" rx="92" ry="26"
        fill="none" stroke="rgba(0,229,255,0.09)" strokeWidth="1" />

      {/* ── Diffusion gradient above bar ── */}
      <defs>
        <linearGradient id="barGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,229,255,0)" />
          <stop offset="25%" stopColor="rgba(0,229,255,0.18)" />
          <stop offset="50%" stopColor="rgba(0,229,255,0.3)" />
          <stop offset="75%" stopColor="rgba(0,229,255,0.18)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </linearGradient>
        <linearGradient id="fieldFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,229,255,0.06)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </linearGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,229,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </radialGradient>
      </defs>

      {/* ── Soft field above bar ── */}
      <rect x="80" y="90" width="320" height="56" fill="url(#fieldFade)" />
      <ellipse cx="240" cy="140" rx="160" ry="28" fill="url(#centerGlow)" />

      {/* ── Light bar body ── */}
      {/* Mount bracket left */}
      <rect x="60" y="140" width="6" height="18" rx="1"
        fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />
      {/* Mount bracket right */}
      <rect x="414" y="140" width="6" height="18" rx="1"
        fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />
      {/* Main bar track */}
      <rect x="66" y="143" width="348" height="12" rx="1.5"
        fill="rgba(16,18,26,0.9)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      {/* LED emission strip */}
      <rect x="70" y="145" width="340" height="8" rx="1"
        fill="url(#barGlow)" />
      {/* Segment tick marks */}
      {Array.from({ length: 17 }).map((_, i) => (
        <line
          key={i}
          x1={70 + i * 21.25}
          y1="145"
          x2={70 + i * 21.25}
          y2="153"
          stroke="rgba(0,229,255,0.15)"
          strokeWidth="0.5"
        />
      ))}

      {/* ── Vertical dimension lines ── */}
      <line x1="50" y1="90" x2="50" y2="155"
        stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 3" />
      <line x1="46" y1="90" x2="54" y2="90"
        stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <line x1="46" y1="155" x2="54" y2="155"
        stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

      {/* ── Technical annotations ── */}
      {/* AMBIENT FIELD label */}
      <text x="50" y="82" textAnchor="middle"
        fontFamily="monospace" fontSize="7" letterSpacing="1.5"
        fill="rgba(0,229,255,0.6)">
        AMBIENT FIELD
      </text>
      {/* DIFFUSION label */}
      <text x="240" y="126" textAnchor="middle"
        fontFamily="monospace" fontSize="7" letterSpacing="1.5"
        fill="rgba(255,255,255,0.25)">
        DIFFUSION ZONE
      </text>
      {/* OPTICAL OUTPUT label */}
      <text x="240" y="172" textAnchor="middle"
        fontFamily="monospace" fontSize="7" letterSpacing="1.5"
        fill="rgba(255,255,255,0.3)">
        OPTICAL OUTPUT
      </text>
      {/* Left END label */}
      <text x="70" y="168" textAnchor="middle"
        fontFamily="monospace" fontSize="6" letterSpacing="1"
        fill="rgba(255,255,255,0.18)">
        L
      </text>
      {/* Right END label */}
      <text x="410" y="168" textAnchor="middle"
        fontFamily="monospace" fontSize="6" letterSpacing="1"
        fill="rgba(255,255,255,0.18)">
        R
      </text>

      {/* ── Vertical signal arrows from bar ── */}
      {/* Left signal ray */}
      <line x1="140" y1="152" x2="110" y2="195"
        stroke="rgba(0,229,255,0.12)" strokeWidth="0.75" strokeDasharray="3 3" />
      {/* Center signal ray */}
      <line x1="240" y1="153" x2="240" y2="210"
        stroke="rgba(0,229,255,0.15)" strokeWidth="0.75" strokeDasharray="3 3" />
      {/* Right signal ray */}
      <line x1="340" y1="152" x2="370" y2="195"
        stroke="rgba(0,229,255,0.12)" strokeWidth="0.75" strokeDasharray="3 3" />

      {/* ── ENVIRONMENT label ── */}
      <text x="240" y="228" textAnchor="middle"
        fontFamily="monospace" fontSize="7" letterSpacing="1.5"
        fill="rgba(255,255,255,0.15)">
        ENVIRONMENT
      </text>
      {/* Thin environment horizon line */}
      <line x1="110" y1="222" x2="370" y2="222"
        stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* ── Top section label ── */}
      <text x="240" y="24" textAnchor="middle"
        fontFamily="monospace" fontSize="7" letterSpacing="1.5"
        fill="rgba(255,255,255,0.2)">
        LIGHT IN MOTION — OPTICAL SYSTEM
      </text>
      <line x1="110" y1="30" x2="370" y2="30"
        stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
    </svg>
  );
}

// ─── Module Card ──────────────────────────────────────────────────────────────

interface ModuleCardProps {
  module: (typeof MODULES)[number];
  visible: boolean;
  delay?: number;
}

function ModuleCard({ module, visible, delay = 0 }: ModuleCardProps) {
  return (
    <article
      className="group relative flex flex-col justify-between h-full border border-white/[0.08] bg-[#10121a] p-6 sm:p-7 transition-colors duration-300 hover:border-[rgba(0,229,255,0.2)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms, border-color 300ms ease`,
      }}
      aria-labelledby={`module-title-${module.id}`}
    >
      {/* Top row: index + annotation */}
      <div className="flex items-start justify-between mb-6">
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "#00E5FF" }}
        >
          {module.index}
        </span>
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/20">
          {module.annotation}
        </span>
      </div>

      {/* Title */}
      <h3
        id={`module-title-${module.id}`}
        className="font-sans font-bold uppercase tracking-tight leading-[0.9] text-[#F3F4F6] mb-4"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
      >
        {module.title}
      </h3>

      {/* Description */}
      <p className="text-[#6B7280] text-sm leading-relaxed flex-1">
        {module.description}
      </p>

      {/* Bottom hairline accent — appears subtly on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-colors duration-300"
        style={{ backgroundColor: "rgba(0,229,255,0)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: "rgba(0,229,255,0.35)" }}
        aria-hidden="true"
      />
    </article>
  );
}

// ─── Primary Module ───────────────────────────────────────────────────────────

interface PrimaryModuleProps {
  module: (typeof MODULES)[number];
  visible: boolean;
}

function PrimaryModule({ module, visible }: PrimaryModuleProps) {
  return (
    <article
      className="group relative flex flex-col border border-white/[0.08] bg-[#10121a] transition-colors duration-300 hover:border-[rgba(0,229,255,0.15)] overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 600ms ease, transform 600ms ease, border-color 300ms ease",
      }}
      aria-labelledby={`module-title-${module.id}`}
    >
      {/* Visual area */}
      <div
        className="flex-1 flex items-center justify-center p-6 sm:p-8"
        style={{ minHeight: "220px" }}
        aria-hidden="true"
      >
        <OpticalFieldDiagram />
      </div>

      {/* Bottom info strip */}
      <div className="border-t border-white/[0.06] p-5 sm:p-6 flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00E5FF]">
              {module.index}
            </span>
            <span className="w-px h-3 bg-white/15" aria-hidden="true" />
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/25">
              {module.annotation}
            </span>
          </div>
          <h3
            id={`module-title-${module.id}`}
            className="font-sans font-bold uppercase tracking-tight leading-[0.92] text-[#F3F4F6] mb-2"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {module.title}
          </h3>
          <p className="text-[#6B7280] text-sm leading-relaxed max-w-md">
            {module.description}
          </p>
        </div>

        {/* Corner bracket decoration */}
        <div className="hidden sm:flex flex-col items-end gap-0.5 pt-1 select-none" aria-hidden="true">
          <div className="w-4 h-px bg-white/15" />
          <div className="w-px h-4 bg-white/15 self-end" />
        </div>
      </div>

      {/* Bottom hover hairline */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: "rgba(0,229,255,0.3)" }}
        aria-hidden="true"
      />
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HardwareBentoGrid() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const primaryModule = MODULES[0];
  const secondaryModules = MODULES.slice(1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.06 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hardware-architecture"
      aria-labelledby="hardware-heading"
      ref={sectionRef}
      className="relative w-full bg-[#070709] border-t border-white/[0.08]"
    >
      {/* ── Section Header ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-24 sm:pt-32 md:pt-36 pb-14 sm:pb-18">
        {/* Technical label */}
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] mb-8 flex items-center gap-2 select-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF]/60" aria-hidden="true" />
          <span>04 {" // "} HARDWARE ARCHITECTURE</span>
        </div>

        {/* Main headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2
              id="hardware-heading"
              className="font-sans font-bold uppercase leading-[0.9] tracking-tight text-[#F3F4F6]"
              style={{ fontSize: "clamp(2.625rem, 8vw, 5.5rem)" }}
            >
              BUILT AROUND
              <br />
              THE LIGHT.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="text-[#9CA3AF] text-base sm:text-lg leading-relaxed mb-3">
              Hardware, optics, and control working together.
            </p>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed max-w-md">
              The Light in Motion system is built around a coordinated set of
              physical and electronic components designed to extend the visual
              environment into the room around the display.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bento Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pb-24 sm:pb-32 md:pb-36">

        {/*
          Desktop layout: asymmetric 3-column grid
          Row 1: [Primary — spans 2 cols] | [Col3 row1] | [Col3 row2]
          Row 2: [Module 4] | [Module 5]

          Using CSS grid with named areas for clarity.
        */}
        <div
          className="hidden lg:grid gap-px bg-white/[0.05]"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
            gridTemplateAreas: `
              "primary primary ctrl"
              "primary primary sig"
              "diff    diff   env"
            `,
          }}
        >
          {/* bg-[#070709] wrapper reset since gap is bg-white/[0.05] */}
          <div style={{ gridArea: "primary" }} className="bg-[#070709]">
            <PrimaryModule module={primaryModule} visible={visible} />
          </div>

          <div style={{ gridArea: "ctrl" }} className="bg-[#070709]">
            <ModuleCard module={secondaryModules[0]} visible={visible} delay={80} />
          </div>

          <div style={{ gridArea: "sig" }} className="bg-[#070709]">
            <ModuleCard module={secondaryModules[1]} visible={visible} delay={160} />
          </div>

          <div style={{ gridArea: "diff" }} className="bg-[#070709]">
            <ModuleCard module={secondaryModules[2]} visible={visible} delay={240} />
          </div>

          <div style={{ gridArea: "env" }} className="bg-[#070709]">
            <ModuleCard module={secondaryModules[3]} visible={visible} delay={320} />
          </div>
        </div>

        {/* Tablet layout: 2-column grid */}
        <div className="hidden sm:grid lg:hidden gap-px bg-white/[0.05]"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="col-span-2 bg-[#070709]">
            <PrimaryModule module={primaryModule} visible={visible} />
          </div>
          {secondaryModules.map((mod, i) => (
            <div key={mod.id} className="bg-[#070709]">
              <ModuleCard module={mod} visible={visible} delay={i * 80} />
            </div>
          ))}
        </div>

        {/* Mobile layout: single column vertical sequence */}
        <div className="flex flex-col sm:hidden gap-px bg-white/[0.05]">
          <div className="bg-[#070709]">
            <PrimaryModule module={primaryModule} visible={visible} />
          </div>
          {secondaryModules.map((mod, i) => (
            <div key={mod.id} className="bg-[#070709]">
              <ModuleCard module={mod} visible={visible} delay={i * 60} />
            </div>
          ))}
        </div>

        {/* Bottom telemetry strip */}
        <div className="mt-px bg-[#070709] border-t border-white/[0.05] pt-5 pb-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/25 select-none">
            <span className="inline-block w-1 h-1 rounded-full bg-[#00E5FF]/50" aria-hidden="true" />
            <span>OPTICAL {" // "} CONTROL {" // "} SIGNAL {" // "} DIFFUSION {" // "} ENVIRONMENT</span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20 select-none">
            SYSTEM OVERVIEW
          </span>
        </div>
      </div>
    </section>
  );
}
