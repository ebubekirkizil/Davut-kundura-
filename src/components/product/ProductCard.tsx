import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductCard({ id, name, price, category, image }: ProductCardProps) {
  return (
    <div className="group relative rounded-xl border border-border/50 bg-white p-4 transition-all hover:shadow-lg dark:bg-muted/50">
      
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/40 flex items-center justify-center">
        {/* We use a placeholder div or img. Using standard img for quick mockup */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 z-10" />
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick Add Button appear on hover */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20 w-3/4">
          <AddToCartButton 
            product={{ id, name, price, image }} 
            fullWidth 
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <span className="text-xs font-medium uppercase tracking-wider text-accent">
          {category}
        </span>
        <h3 className="font-serif text-lg font-medium text-foreground">
          <Link href={`/products/${id}`} className="hover:underline">
            {name}
          </Link>
        </h3>
        <p className="text-sm font-semibold text-foreground/80">
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price)}
        </p>
      </div>

    </div>
  );
}
