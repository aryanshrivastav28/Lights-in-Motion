"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export default function AppDownloadPage() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center py-20">
      <Section>
        <Container size="narrow">
          <div className="text-center space-y-6 p-8 sm:p-12 rounded-sm bg-white/[0.02] border border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
              <span>LIGHT IN MOTION CONTROLLER</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase text-white">
                APP DOWNLOAD
              </h1>
              <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                Hardware synchronization companion software for real-time ambient lighting calibration, screen sampling, and profile management.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  alert("Download link for Light in Motion Controller application.");
                }}
              >
                DOWNLOAD FOR WINDOWS
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  alert("Download link for Light in Motion Controller application.");
                }}
              >
                DOWNLOAD FOR MACOS
              </Button>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex justify-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                  <ArrowLeftIcon size={14} className="mr-1.5" />
                  <span>BACK TO HOME</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
