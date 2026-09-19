"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stage {
  id: string;
  index: string;
  title: string;
  headline: string;
  description: string;
  meta?: string;
}

// ─── Stage Data ───────────────────────────────────────────────────────────────

const STAGES: Stage[] = [
  {
    id: "signal",
    index: "01",
    title: "SIGNAL",
    headline: "THE SCREEN\nIS THE SOURCE.",
    description:
      "Visual information begins at the display. Light in Motion reads what is happening on screen as the origin of the ambient experience.",
    meta: "INPUT // DISPLAY",
  },
  {
    id: "extraction",
    index: "02",
    title: "EXTRACTION",
    headline: "READ THE\nVISUAL FIELD.",
    description:
      "The system interprets the visual information present on the display and translates it into lighting information for the surrounding environment.",
    meta: "PROCESS // VISUAL FIELD",
  },
  {
    id: "synchronization",
    index: "03",
    title: "SYNCHRONIZATION",
    headline: "TRANSLATE\nTHE SIGNAL.",
    description:
      "The lighting system converts the interpreted information into coordinated ambient output, aligning the surrounding light with the content on screen.",
    meta: "OUTPUT // AMBIENT ARRAY",
  },
  {
    id: "immersion",
    index: "04",
    title: "IMMERSION",
    headline: "EXTEND\nTHE FRAME.",
    description:
      "The environment becomes a continuation of the visual experience. The boundary between the display and the room dissolves.",
    meta: "STATE // ENVIRONMENT",
  },
];

// ─── SVG Stage Diagrams ───────────────────────────────────────────────────────

function DiagramSignal({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      <rect
        x="30"
        y="12"
        width="100"
        height="60"
        rx="2"
        stroke={active ? "rgba(17,18,20,0.6)" : "rgba(17,18,20,0.20)"}
        strokeWidth="1"
        fill="none"
      />
      <line
        x1="42"
        y1="32"
        x2="118"
        y2="32"
        stroke={active ? "rgba(17,18,20,0.3)" : "rgba(17,18,20,0.10)"}
        strokeWidth="1"
      />
      <polyline
        points="42,52 58,36 70,58 84,40 96,54 108,44 118,52"
        stroke={active ? "#1687FF" : "rgba(17,18,20,0.20)"}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 500ms ease" }}
      />
      <line
        x1="80"
        y1="72"
        x2="80"
        y2="88"
        stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"}
        strokeWidth="1"
        strokeDasharray="2 2"
        style={{ transition: "stroke 500ms ease" }}
      />
      <polyline
        points="75,84 80,90 85,84"
        stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 500ms ease" }}
      />
      <text
        x="80"
        y="97"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7"
        letterSpacing="1.5"
        fill={active ? "#1687FF" : "#55575A"}
        style={{ transition: "fill 500ms ease" }}
      >
        SIGNAL
      </text>
    </svg>
  );
}

function DiagramExtraction({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      <rect
        x="30"
        y="12"
        width="100"
        height="60"
        rx="2"
        stroke={active ? "rgba(17,18,20,0.6)" : "rgba(17,18,20,0.20)"}
        strokeWidth="1"
        fill="none"
      />
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={32 + col * 24}
            y={14 + row * 19}
            width="22"
            height="17"
            rx="0"
            stroke={active ? "rgba(22,135,255,0.4)" : "rgba(17,18,20,0.10)"}
            strokeWidth="0.75"
            fill={active && (col + row) % 3 === 0 ? "rgba(22,135,255,0.08)" : "none"}
            style={{ transition: "stroke 500ms ease, fill 500ms ease" }}
          />
        ))
      )}
      <line
        x1="80"
        y1="72"
        x2="80"
        y2="88"
        stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"}
        strokeWidth="1"
        strokeDasharray="2 2"
        style={{ transition: "stroke 500ms ease" }}
      />
      <polyline
        points="75,84 80,90 85,84"
        stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 500ms ease" }}
      />
      <text
        x="80"
        y="97"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7"
        letterSpacing="1.5"
        fill={active ? "#1687FF" : "#55575A"}
        style={{ transition: "fill 500ms ease" }}
      >
        EXTRACT
      </text>
    </svg>
  );
}

function DiagramSynchronization({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      <circle
        cx="80"
        cy="50"
        r="8"
        stroke={active ? "#1687FF" : "rgba(17,18,20,0.25)"}
        strokeWidth="1"
        fill={active ? "rgba(22,135,255,0.08)" : "none"}
        style={{ transition: "stroke 500ms ease, fill 500ms ease" }}
      />
      <rect
        x="8"
        y="34"
        width="36"
        height="24"
        rx="1.5"
        stroke={active ? "rgba(17,18,20,0.6)" : "rgba(17,18,20,0.20)"}
        strokeWidth="1"
        fill="none"
      />
      <rect
        x="116"
        y="34"
        width="36"
        height="24"
        rx="1.5"
        stroke={active ? "rgba(17,18,20,0.6)" : "rgba(17,18,20,0.20)"}
        strokeWidth="1"
        fill="none"
      />
      <line
        x1="44"
        y1="46"
        x2="72"
        y2="50"
        stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"}
        strokeWidth="1"
        style={{ transition: "stroke 500ms ease" }}
      />
      <line
        x1="88"
        y1="50"
        x2="116"
        y2="46"
        stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"}
        strokeWidth="1"
        style={{ transition: "stroke 500ms ease" }}
      />
      <text
        x="26"
        y="68"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="6"
        letterSpacing="1"
        fill={active ? "#111214" : "#55575A"}
        style={{ transition: "fill 500ms ease" }}
      >
        DISPLAY
      </text>
      <text
        x="134"
        y="68"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="6"
        letterSpacing="1"
        fill={active ? "#111214" : "#55575A"}
        style={{ transition: "fill 500ms ease" }}
      >
        LIGHT
      </text>
      <line
        x1="40"
        y1="84"
        x2="120"
        y2="84"
        stroke={active ? "rgba(22,135,255,0.4)" : "rgba(17,18,20,0.10)"}
        strokeWidth="1"
        style={{ transition: "stroke 500ms ease" }}
      />
      <text
        x="80"
        y="97"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7"
        letterSpacing="1.5"
        fill={active ? "#1687FF" : "#55575A"}
        style={{ transition: "fill 500ms ease" }}
      >
        SYNC
      </text>
    </svg>
  );
}

function DiagramImmersion({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      <rect
        x="48"
        y="26"
        width="64"
        height="42"
        rx="2"
        stroke={active ? "rgba(17,18,20,0.6)" : "rgba(17,18,20,0.20)"}
        strokeWidth="1"
        fill="none"
      />
      <rect
        x="6"
        y="30"
        width="34"
        height="34"
        rx="1"
        stroke={active ? "rgba(22,135,255,0.5)" : "rgba(17,18,20,0.14)"}
        strokeWidth="0.75"
        fill={active ? "rgba(22,135,255,0.06)" : "none"}
        style={{ transition: "stroke 500ms ease, fill 500ms ease" }}
      />
      <rect
        x="120"
        y="30"
        width="34"
        height="34"
        rx="1"
        stroke={active ? "rgba(22,135,255,0.5)" : "rgba(17,18,20,0.14)"}
        strokeWidth="0.75"
        fill={active ? "rgba(22,135,255,0.06)" : "none"}
        style={{ transition: "stroke 500ms ease, fill 500ms ease" }}
      />
      <rect
        x="52"
        y="76"
        width="56"
        height="10"
        rx="1"
        stroke={active ? "rgba(22,135,255,0.4)" : "rgba(17,18,20,0.12)"}
        strokeWidth="0.75"
        fill={active ? "rgba(22,135,255,0.06)" : "none"}
        style={{ transition: "stroke 500ms ease, fill 500ms ease" }}
      />
      <line x1="40" y1="47" x2="48" y2="47" stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"} strokeWidth="0.75" style={{ transition: "stroke 500ms ease" }} />
      <line x1="112" y1="47" x2="120" y2="47" stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"} strokeWidth="0.75" style={{ transition: "stroke 500ms ease" }} />
      <line x1="80" y1="68" x2="80" y2="76" stroke={active ? "#1687FF" : "rgba(17,18,20,0.14)"} strokeWidth="0.75" style={{ transition: "stroke 500ms ease" }} />
      <text
        x="80"
        y="10"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7"
        letterSpacing="1.5"
        fill={active ? "#1687FF" : "#55575A"}
        style={{ transition: "fill 500ms ease" }}
      >
        ENVIRONMENT
      </text>
    </svg>
  );
}

const STAGE_DIAGRAMS = [DiagramSignal, DiagramExtraction, DiagramSynchronization, DiagramImmersion];

// ─── System Flow Diagram ──────────────────────────────────────────────────────

function SystemFlowDiagram({ activeIndex }: { activeIndex: number }) {
  const nodes = ["DISPLAY", "SIGNAL", "LIGHT SYSTEM", "ENVIRONMENT"];
  return (
    <div className="flex flex-col items-center gap-0 select-none" aria-hidden="true">
      {nodes.map((node, i) => {
        const isActive = i <= activeIndex;
        const isCurrentNode = i === activeIndex;
        return (
          <React.Fragment key={node}>
            <div
              className="relative flex items-center justify-center px-4 py-1.5 border rounded-sm transition-all duration-500"
              style={{
                borderColor: isCurrentNode
                  ? "rgba(22,135,255,0.6)"
                  : isActive
                  ? "rgba(17,18,20,0.20)"
                  : "rgba(17,18,20,0.12)",
                backgroundColor: isCurrentNode
                  ? "rgba(22,135,255,0.06)"
                  : "transparent",
                minWidth: "9rem",
              }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-500"
                style={{
                  color: isCurrentNode
                    ? "#1687FF"
                    : isActive
                    ? "#111214"
                    : "#55575A",
                }}
              >
                {node}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex flex-col items-center" style={{ height: "2rem" }}>
                <div
                  className="w-px flex-1 transition-colors duration-500"
                  style={{
                    backgroundColor:
                      i < activeIndex
                        ? "rgba(22,135,255,0.6)"
                        : "rgba(17,18,20,0.14)",
                  }}
                />
                <div
                  className="transition-colors duration-500"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "3px solid transparent",
                    borderRight: "3px solid transparent",
                    borderTop: `4px solid ${i < activeIndex ? "rgba(22,135,255,0.6)" : "rgba(17,18,20,0.14)"}`,
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Timeline Nav Item ────────────────────────────────────────────────────────

function TimelineNavItem({
  stage,
  index,
  activeIndex,
  totalStages,
  onClick,
}: {
  stage: Stage;
  index: number;
  activeIndex: number;
  totalStages: number;
  onClick: () => void;
}) {
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;
  const isLast = index === totalStages - 1;

  return (
    <li className="relative flex gap-5 cursor-pointer list-none" onClick={onClick}>
      <div className="relative flex flex-col items-center" style={{ width: "1.5rem" }}>
        <div
          className="relative z-10 flex-shrink-0 rounded-full border transition-all duration-500"
          style={{
            width: "9px",
            height: "9px",
            marginTop: "3px",
            borderColor: isActive
              ? "#1687FF"
              : isPast
              ? "#1687FF"
              : "rgba(17,18,20,0.25)",
            backgroundColor: isActive
              ? "#1687FF"
              : isPast
              ? "rgba(22,135,255,0.3)"
              : "transparent",
            boxShadow: isActive ? "0 0 6px rgba(22,135,255,0.35)" : "none",
          }}
        />
        {!isLast && (
          <div
            className="flex-1 mt-1 transition-colors duration-500"
            style={{
              width: "1px",
              minHeight: "3.5rem",
              backgroundColor: isPast
                ? "rgba(22,135,255,0.3)"
                : "rgba(17,18,20,0.12)",
            }}
          />
        )}
      </div>

      <div className="pb-10 flex-1 min-w-0">
        <div
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors duration-300"
          style={{
            color: isActive ? "#1687FF" : isPast ? "#1687FF" : "#6B6D70",
          }}
        >
          {stage.index}{" //"}
        </div>
        <div
          className="font-sans text-sm font-semibold tracking-[0.12em] uppercase transition-colors duration-300"
          style={{
            color: isActive
              ? "#111214"
              : isPast
              ? "#111214"
              : "#55575A",
          }}
        >
          {stage.title}
        </div>
      </div>
    </li>
  );
}

// ─── Desktop Stage Panel ──────────────────────────────────────────────────────

function StagePanel({
  stage,
  index,
  activeIndex,
  stageRef,
}: {
  stage: Stage;
  index: number;
  activeIndex: number;
  stageRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isActive = index === activeIndex;
  const Diagram = STAGE_DIAGRAMS[index];

  return (
    <div
      ref={stageRef}
      data-stage-index={index}
      className="relative py-16 md:py-20 lg:py-24 border-t border-[rgba(17,18,20,0.10)] first:border-t-0 transition-all duration-500"
      style={{ opacity: 1 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ color: isActive ? "#1687FF" : "#6B6D70" }}
            >
              {stage.index}{" // "}{stage.title}
            </span>
          </div>

          <h3
            className="font-sans font-bold uppercase leading-[0.92] mb-6 transition-colors duration-300"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: isActive ? "#111214" : "#55575A",
              whiteSpace: "pre-line",
            }}
          >
            {stage.headline}
          </h3>

          <p
            className="text-sm sm:text-base leading-relaxed transition-colors duration-300 max-w-sm"
            style={{
              color: isActive ? "#55575A" : "#6B6D70",
            }}
          >
            {stage.description}
          </p>

          {stage.meta && (
            <div
              className="mt-6 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{
                color: isActive ? "#1687FF" : "#6B6D70",
              }}
            >
              {stage.meta}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div
            className="w-full max-w-[200px] sm:max-w-[220px] transition-opacity duration-500"
            style={{ aspectRatio: "16/10", opacity: isActive ? 1 : 0.75 }}
          >
            <Diagram active={isActive} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function SyncEngineTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stagePanelRefs = useRef<React.RefObject<HTMLDivElement | null>[]>(
    STAGES.map(() => React.createRef<HTMLDivElement | null>())
  );

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setActiveIndex(0);
      return;
    }

    const observers: IntersectionObserver[] = [];

    stagePanelRefs.current.forEach((ref, i) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(i);
            }
          });
        },
        {
          rootMargin: "-30% 0px -30% 0px",
          threshold: 0,
        }
      );
      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollToStage = (index: number) => {
    const ref = stagePanelRefs.current[index];
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="sync-engine"
      aria-labelledby="sync-engine-heading"
      className="relative w-full bg-[#F4F1EA] border-t border-[rgba(17,18,20,0.10)]"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-20">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6D70] mb-8 flex items-center gap-2 select-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1687FF]" aria-hidden="true" />
          <span>03 // THE SYNC ENGINE</span>
        </div>

        <h2
          id="sync-engine-heading"
          className="font-sans font-bold uppercase leading-[0.9] tracking-tight text-[#111214] mb-6"
          style={{ fontSize: "clamp(2.625rem, 8vw, 5.5rem)" }}
        >
          FROM SCREEN
          <br />
          TO ENVIRONMENT.
        </h2>

        <p className="font-sans text-[#55575A] text-base sm:text-lg leading-relaxed max-w-xl mb-4">
          What happens on screen should not stop at the screen.
        </p>

        <p className="text-[#55575A] text-sm sm:text-base leading-relaxed max-w-lg">
          Light in Motion translates visual information from your display into ambient
          lighting around your environment — extending the content experience beyond
          the boundaries of the screen.
        </p>
      </div>

      {/* Two-Column Body */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pb-24 sm:pb-32 md:pb-36">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 xl:gap-24">

          {/* LEFT: Sticky navigation (desktop only) */}
          <div className="hidden lg:block">
            <div
              className="sticky"
              style={{ top: "calc(4rem + 24px)" }}
            >
              <ol aria-label="Sync Engine stages" className="list-none p-0 m-0">
                {STAGES.map((stage, i) => (
                  <TimelineNavItem
                    key={stage.id}
                    stage={stage}
                    index={i}
                    activeIndex={activeIndex}
                    totalStages={STAGES.length}
                    onClick={() => scrollToStage(i)}
                  />
                ))}
              </ol>

              <div className="mt-10 pt-10 border-t border-[rgba(17,18,20,0.10)]">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6D70] mb-5 select-none">
                  SIGNAL PIPELINE
                </div>
                <SystemFlowDiagram activeIndex={activeIndex} />
              </div>
            </div>
          </div>

          {/* RIGHT: Stage content */}
          <div>
            {/* Mobile vertical layout */}
            <div className="lg:hidden relative pl-6 border-l border-[rgba(17,18,20,0.10)]">
              <div className="mb-10">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6D70] mb-4 select-none">
                  SIGNAL PIPELINE
                </div>
                <SystemFlowDiagram activeIndex={activeIndex} />
              </div>

              {STAGES.map((stage, i) => {
                const Diagram = STAGE_DIAGRAMS[i];
                return (
                  <div key={stage.id} className="relative mb-14 last:mb-0">
                    <div
                      className="absolute -left-[1.875rem] top-1 w-[9px] h-[9px] rounded-full border transition-all duration-500"
                      aria-hidden="true"
                      style={{
                        borderColor:
                          activeIndex === i
                            ? "#1687FF"
                            : activeIndex > i
                            ? "rgba(22,135,255,0.4)"
                            : "rgba(17,18,20,0.2)",
                        backgroundColor:
                          activeIndex === i
                            ? "#1687FF"
                            : activeIndex > i
                            ? "rgba(22,135,255,0.15)"
                            : "transparent",
                        boxShadow: activeIndex === i ? "0 0 6px rgba(22,135,255,0.35)" : "none",
                      }}
                    />
                    <div
                      ref={i === 0 ? undefined : undefined}
                      data-stage-index={i}
                    >
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2 text-[#1687FF]">
                        {stage.index}{" // "}{stage.title}
                      </div>
                      <h3
                        className="font-sans font-bold uppercase leading-[0.92] mb-3 text-[#111214]"
                        style={{ fontSize: "clamp(1.75rem, 7vw, 2.25rem)", whiteSpace: "pre-line" }}
                      >
                        {stage.headline}
                      </h3>
                      <p className="text-[#55575A] text-sm leading-relaxed mb-5 max-w-xs">
                        {stage.description}
                      </p>
                      <div className="w-36 h-auto" style={{ aspectRatio: "16/10" }}>
                        <Diagram active={true} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop stage panels */}
            <div className="hidden lg:block">
              {STAGES.map((stage, i) => (
                <StagePanel
                  key={stage.id}
                  stage={stage}
                  index={i}
                  activeIndex={activeIndex}
                  stageRef={stagePanelRefs.current[i]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
