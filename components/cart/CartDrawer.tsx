"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Drawer } from "@/components/ui/Drawer";
import { CartIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";
import { useLocalization } from "@/context/LocalizationContext";

export interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  itemCount?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = () => {
  const { cart, cartCount, cartTotal, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { formatPrice } = useLocalization();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const hasItems = cart.length > 0;

  return (
    <>
      <Drawer
        isOpen={isCartOpen}
        onClose={closeCart}
        position="right"
        title={hasItems ? `CART (${cartCount < 10 ? `0${cartCount}` : cartCount})` : "CART"}
        subtitle="LIGHT IN MOTION"
      >
        {hasItems ? (
          <div className="flex flex-col h-full justify-between font-sans text-black">
            {/* Items List */}
            <div className="space-y-4 overflow-y-auto pr-1 pb-4 flex-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 bg-neutral-50/80 p-3 rounded-2xl border border-black/10 relative group hover:border-black/25 transition-all"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-black/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="text-xs sm:text-sm font-extrabold text-black truncate block hover:text-neutral-600 transition-colors"
                    >
                      {item.title}
                    </Link>
                    <span className="text-[11px] font-semibold text-neutral-500 block truncate">
                      {item.variantName}
                    </span>
                    <span className="text-xs font-black text-black mt-0.5 block">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-rose-500 text-xs p-1 cursor-pointer transition-colors"
                      title="Remove item"
                    >
                      ✕
                    </button>
                    <div className="flex items-center bg-white border border-black/15 rounded-full px-2 py-0.5 gap-2 shadow-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-xs font-bold text-neutral-600 hover:text-black w-4 h-4 flex items-center justify-center cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-xs font-black text-black min-w-[12px] text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-xs font-bold text-neutral-600 hover:text-black w-4 h-4 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Checkout Card */}
            <div className="border-t border-black/10 pt-4 space-y-3 shrink-0">
              <div className="flex items-baseline justify-between text-black">
                <span className="text-xs uppercase tracking-wider font-extrabold font-sans text-neutral-600">
                  Subtotal
                </span>
                <span className="text-xl font-black font-sans tracking-tight">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Taxes, shipping & express doorstep delivery calculated at checkout.
              </p>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-sm py-3.5 px-6 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all active:scale-[0.98] cursor-pointer text-center"
                >
                  Checkout • {formatPrice(cartTotal)}
                </button>
                <div className="flex items-center justify-between px-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] text-neutral-400 hover:text-rose-500 font-semibold cursor-pointer transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="text-[11px] text-neutral-600 hover:text-black font-bold cursor-pointer transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center space-y-5 font-sans text-black">
            <div className="w-14 h-14 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mx-auto text-black">
              <CartIcon size={22} />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-black tracking-wider uppercase text-black font-sans">
                Your Cart is Empty
              </h3>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed font-sans font-medium">
                Explore cinema-grade ambient lighting designed for high-refresh monitors, TVs, and battle stations.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/store" onClick={closeCart}>
                <button
                  type="button"
                  className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs px-6 py-3 rounded-full transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  Explore Store
                </button>
              </Link>
            </div>
          </div>
        )}
      </Drawer>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-black/15 shadow-2xl space-y-4 font-sans text-black">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <h3 className="text-lg font-black text-black">Order Checkout</h3>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-black/5">
                  <span className="font-bold truncate max-w-[220px]">
                    {item.quantity}x {item.title} ({item.variantName})
                  </span>
                  <span className="font-black">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="bg-neutral-100 p-3.5 rounded-2xl border border-black/10 flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-neutral-600">Total Payable</span>
              <span className="text-lg font-black text-black">{formatPrice(cartTotal)}</span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              You will be redirected to the secure payment portal with instant UPI, Credit/Debit Card, NetBanking, and Cash on Delivery support.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  alert(`Thank you! Order confirmed for ${cartCount} item(s) totalling ${formatPrice(cartTotal)}. Our support will contact you for dispatch.`);
                  clearCart();
                  setCheckoutModalOpen(false);
                  closeCart();
                }}
                className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold py-3.5 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer text-sm"
              >
                Proceed to Payment ({formatPrice(cartTotal)})
              </button>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
