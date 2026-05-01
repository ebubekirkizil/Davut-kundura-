"use client";

import { SessionProvider } from "next-auth/react";
import LiveTracker from "./analytics/LiveTracker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LiveTracker />
      {children}
    </SessionProvider>
  );
}
