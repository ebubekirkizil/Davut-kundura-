import { Metadata } from "next";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Tüm Ürünler | Davut Kundura",
  description: "Ortopedik tabanlar, kemerler, ayakkabı bakım ürünleri ve daha fazlasını inceleyin.",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-6 py-12 pt-24">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Koleksiyonumuz</h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Davut Kundura kalitesiyle üretilmiş ve seçilmiş, şıklığınızı tamamlayan ve konforunuzu artıran tüm premium ürünlerimizi keşfedin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
