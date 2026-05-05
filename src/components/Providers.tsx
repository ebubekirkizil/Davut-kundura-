"use client";

import { SessionProvider } from "next-auth/react";
import LiveTracker from "./analytics/LiveTracker";
import { CartProvider } from "@/contexts/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <LiveTracker />
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
