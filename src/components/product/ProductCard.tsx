import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number | null;
    category: string;
    imageUrls: string[];
    slug: string;
    stock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, compareAtPrice, category, imageUrls, slug, stock } = product;
  const image = imageUrls[0] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop";
  const image2 = imageUrls && imageUrls.length > 1 ? imageUrls[1] : image;

  const isOutOfStock = stock <= 0;
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  return (
    <div className="group relative flex flex-col bg-transparent transition-all duration-500 hover:-translate-y-2">
      
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f5f1ea] flex items-center justify-center shadow-sm group-hover:shadow-2xl transition-all duration-700">
        {/* Etiketler (İndirim / Tükendi) */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
          {isOutOfStock && (
            <span className="bg-[#1a120b] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm backdrop-blur-md">Tükendi</span>
          )}
          {hasDiscount && !isOutOfStock && (
            <span className="bg-[#d4af37] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-md">% İndirim</span>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
        <Link href={`/products/${slug}`} className="absolute inset-0 z-20" />
        
        {/* Ana Resim */}
        <img 
          src={image} 
          alt={name}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:opacity-0 ${isOutOfStock ? 'grayscale opacity-70' : ''}`}
        />
        
        {/* Hover Resim */}
        <img 
          src={image2} 
          alt={`${name} alt`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.5s] ease-out scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${isOutOfStock ? 'grayscale' : ''}`}
        />
        
        {/* Quick Add Button */}
        {!isOutOfStock && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-30 w-[90%]">
            <div className="shadow-2xl rounded-sm overflow-hidden border border-white/20">
              <AddToCartButton 
                product={{ id, name, price, image }} 
                fullWidth 
              />
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-6 flex flex-col space-y-2 text-center px-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
          {category.replace(/_/g, " ")}
        </span>
        <h3 className="font-serif text-lg font-medium text-[#1a120b] leading-tight">
          <Link href={`/products/${slug}`} className="hover:text-[#d4af37] transition-colors line-clamp-1 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-[#d4af37] after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
            {name}
          </Link>
        </h3>
        
        <div className="flex items-center justify-center gap-3 pt-1">
          {hasDiscount && (
            <span className="text-sm text-[#999] line-through decoration-1 font-light">
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(compareAtPrice)}
            </span>
          )}
          <span className={`text-base font-medium ${hasDiscount ? 'text-red-600' : 'text-[#1a120b]'}`}>
            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price)}
          </span>
        </div>
      </div>
    </div>
  );
