import { Metadata } from "next";
import ProductCard from "@/components/product/ProductCard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Koleksiyon | Davut Kundura",
  description: "Hakiki deri ayakkabılar, ortopedik tabanlar, kemerler, ayakkabı bakım ürünleri ve daha fazlasını inceleyin.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      include: {
        variants: true,
        reviews: true,
      }
    });
  } catch (error) {
    console.error("Ürünler yüklenemedi:", error);
  }

  const hasProducts = products.length > 0;

  return (
    <div className="bg-[#faf9f8] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1a120b] pt-32 pb-20 px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Koleksiyonumuz</h1>
        <p className="text-white/70 max-w-2xl mx-auto font-light tracking-wide">
          Davut Kundura kalitesiyle üretilmiş ve seçilmiş, şıklığınızı tamamlayan ve konforunuzu artıran tüm premium ürünlerimizi keşfedin.
        </p>
      </div>

      <div className="container mx-auto px-6 lg:px-16 -mt-8 relative z-10">
        {!hasProducts ? (
           <div className="text-center py-24 bg-white rounded-xl shadow-sm border border-[#eaeaea]">
             <p className="text-[#666] font-medium text-lg">Koleksiyon güncelleniyor...</p>
             <p className="text-sm text-[#999] mt-2">Şu anda gösterilecek aktif ürün bulunmuyor.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => {
              const formattedProduct = {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                category: product.category,
                imageUrls: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop"],
                slug: product.slug,
                stock: product.stock,
              };
              return <ProductCard key={product.id} product={formattedProduct as any} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
