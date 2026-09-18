"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "register";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "signin",
}) => {
  const [tab, setTab] = useState<"signin" | "register">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tab === "signin" ? "ACCOUNT SIGN IN" : "CREATE ACCOUNT"}
      subtitle="LIGHT IN MOTION"
    >
      <div className="space-y-6">
        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-white/[0.03] border border-white/[0.08] rounded-sm text-xs font-mono">
          <button
            type="button"
            onClick={() => setTab("signin")}
            className={`py-2 text-center uppercase tracking-wider font-medium transition-colors ${
              tab === "signin"
                ? "bg-white text-neutral-950 font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setTab("register")}
            className={`py-2 text-center uppercase tracking-wider font-medium transition-colors ${
              tab === "register"
                ? "bg-white text-neutral-950 font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="auth-email"
              className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5"
            >
              EMAIL ADDRESS
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-white/10 rounded-sm text-white placeholder-neutral-600 text-sm font-sans focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="auth-password"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
              >
                PASSWORD
              </label>
              {tab === "signin" && (
                <button
                  type="button"
                  className="text-[11px] font-mono text-neutral-400 hover:text-cyan-400 transition-colors"
                >
                  FORGOT?
                </button>
              )}
            </div>
            <input
              id="auth-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-neutral-900/90 border border-white/10 rounded-sm text-white placeholder-neutral-600 text-sm font-sans focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full mt-3">
            {tab === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};
