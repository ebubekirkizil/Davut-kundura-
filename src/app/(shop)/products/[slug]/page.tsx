import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/product/AddToCartButton";
import { ShieldCheck, Truck, RotateCcw, Star } from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// SEO için dinamik metadata (sayfa başlıkları) oluştur
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return { title: "Ürün Bulunamadı | Davut Kundura" };
    return {
      title: `${product.name} | Davut Kundura`,
      description: product.shortDesc || product.description.substring(0, 160),
      openGraph: { images: product.imageUrls[0] ? [product.imageUrls[0]] : [] },
    };
  } catch {
    return { title: "Davut Kundura" };
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  let product: any = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: { variants: true, reviews: true }
    });
  } catch (error) {
    console.error("Ürün yüklenemedi:", error);
  }

  if (!product || product.status === "ARCHIVED") {
    notFound();
  }

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const image = product.imageUrls[0] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-[#888] font-medium tracking-wide uppercase mb-8">
          <a href="/" className="hover:text-[#1a120b] transition-colors">Ana Sayfa</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-[#1a120b] transition-colors">Koleksiyon</a>
          <span className="mx-2">/</span>
          <span className="text-[#1a120b]">{product.category.replace(/_/g, " ")}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Ürün Görseli */}
          <div className="relative aspect-square md:aspect-[4/5] bg-[#faf9f8] rounded-2xl overflow-hidden border border-[#eaeaea]">
            {isOutOfStock && (
              <div className="absolute top-6 left-6 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm">
                Tükendi
              </div>
            )}
            {hasDiscount && !isOutOfStock && (
              <div className="absolute top-6 left-6 z-20 bg-[#1a120b] text-[#d4af37] text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm">
                İndirim
              </div>
            )}
            <img 
              src={image} 
              alt={product.name}
              className={`w-full h-full object-cover object-center ${isOutOfStock ? 'grayscale opacity-80' : ''}`}
            />
          </div>

          {/* Ürün Bilgileri */}
          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a120b] leading-tight mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs text-[#666] ml-2 mt-0.5">(12 Değerlendirme)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className={`text-3xl font-bold ${hasDiscount ? 'text-red-600' : 'text-[#1a120b]'}`}>
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-[#999] line-through decoration-1">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.compareAtPrice!)}
                </span>
              )}
            </div>

            <div className="prose prose-sm text-[#555] mb-8 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Sepete Ekle */}
            <div className="pt-6 border-t border-[#eaeaea] mb-10">
              {isOutOfStock ? (
                <div className="bg-[#f5f5f5] text-[#888] font-bold py-4 rounded-xl text-center uppercase tracking-widest text-sm cursor-not-allowed">
                  Stokta Yok
                </div>
              ) : (
                <AddToCartButton 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: image
                  }}
                  fullWidth
                />
              )}
              {product.stock > 0 && product.stock <= product.lowStockAlert && (
                <p className="text-orange-600 text-xs font-medium mt-3 flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  Acele edin, sadece {product.stock} adet kaldı!
                </p>
              )}
            </div>

            {/* Güven Rozetleri */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#eaeaea]">
              <div className="flex flex-col gap-1.5 items-center text-center p-3 bg-[#faf9f8] rounded-xl border border-[#f0f0f0]">
                <Truck className="w-5 h-5 text-[#1a120b]" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a120b]">Hızlı Teslimat</span>
              </div>
              <div className="flex flex-col gap-1.5 items-center text-center p-3 bg-[#faf9f8] rounded-xl border border-[#f0f0f0]">
                <ShieldCheck className="w-5 h-5 text-[#1a120b]" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a120b]">Güvenli Ödeme</span>
              </div>
              <div className="flex flex-col gap-1.5 items-center text-center p-3 bg-[#faf9f8] rounded-xl border border-[#f0f0f0]">
                <RotateCcw className="w-5 h-5 text-[#1a120b]" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a120b]">Kolay İade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
