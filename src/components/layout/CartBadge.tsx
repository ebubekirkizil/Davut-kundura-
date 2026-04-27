'use client';

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function CartBadge() {
  const { getTotals } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white transition-colors">
        0
      </span>
    );
  }

  const { totalItems } = getTotals();

  return (
    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white transition-colors group-hover:bg-accent-hover">
      {totalItems}
    </span>
  );
}
