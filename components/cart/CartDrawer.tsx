"use client";

import React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { CartIcon } from "@/components/ui/Icons";

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  itemCount = 0,
}) => {
  const hasItems = itemCount > 0;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      title={hasItems ? `CART (${itemCount < 10 ? `0${itemCount}` : itemCount})` : "CART"}
      subtitle="LIGHT IN MOTION"
    >
      {hasItems ? (
        <div className="space-y-4">
          {/* Future real cart items container */}
        </div>
      ) : (
        <div className="py-20 text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
            <CartIcon size={20} />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-white font-semibold">
              YOUR CART IS EMPTY
            </h3>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
              Explore cinema-grade ambient lighting designed for high-refresh monitors and home theaters.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/store" onClick={onClose}>
              <Button variant="secondary" size="sm">
                EXPLORE STORE
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  );
};
