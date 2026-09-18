import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export default function StorePage() {
  return (
    <div className="w-full py-10">
      <Container size="narrow">
        <div className="text-center space-y-6 p-8 sm:p-12 rounded-sm bg-white/[0.02] border border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
            <span>HARDWARE COLLECTION</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase text-white">
              LIGHT IN MOTION STORE
            </h1>
            <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
              Cinema-grade ambient lighting systems, sync boxes, and custom display backlights for monitors and home theaters.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <Link href="/">
              <Button variant="secondary" size="md">
                <ArrowLeftIcon size={14} className="mr-2" />
                <span>RETURN HOME</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
