'use client';

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  fullWidth?: boolean;
}

export default function AddToCartButton({ product, fullWidth }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity: 1 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`
        flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300
        ${fullWidth ? 'w-full' : ''}
        ${isAdded 
          ? 'bg-green-600 text-white hover:bg-green-700' 
          : 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
        }
      `}
    >
      <ShoppingCart className="h-4 w-4" />
      {isAdded ? "Sepete Eklendi!" : "Sepete Ekle"}
    </button>
  );
}
