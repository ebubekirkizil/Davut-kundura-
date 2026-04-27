import { Metadata, ResolvingMetadata } from "next";
import { PRODUCTS } from "@/lib/mockData";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/product/AddToCartButton";
import { ArrowLeft, Check, Shield, Truck } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

// Define the correct props type based on Next.js 15+ documentation
// `params` is a Promise in Next 15+
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    return {
      title: "Ürün Bulunamadı | Davut Kundura",
    };
  }

  return {
    title: `${product.name} | Davut Kundura`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  // Await the params as required in Next 15+
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 pt-24 font-sans">
      {/* JSON-LD Schema Markup for Google SEO */}
      <Script id={`schema-${product.id}`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": [product.image],
          "description": product.description,
          "sku": product.id,
          "offers": {
            "@type": "Offer",
            "url": `https://davutkundura.vercel.app/products/${product.id}`,
            "priceCurrency": "TRY",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
          }
        })
      }} />

      <Link href="/products" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Tüm Ürünlere Dön
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="aspect-square bg-muted rounded-2xl overflow-hidden shadow-sm flex items-center justify-center relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2">{product.category}</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">{product.name}</h1>
          
          <div className="text-3xl font-bold mb-6 text-foreground">
            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price)}
          </div>
          
          <p className="text-foreground/80 leading-relaxed text-lg mb-8">
            {product.description}
          </p>

          <div className="mb-10">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Özellikler</h3>
            <ul className="space-y-3">
              {product.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-foreground/80">
                  <div className="flex bg-accent/10 items-center justify-center rounded-full p-1">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 border-t border-border/50">
            <AddToCartButton product={product} fullWidth />
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 py-4 px-6 bg-muted/40 rounded-xl border border-border/40">
            <div className="flex flex-col items-center gap-2 text-center flex-1">
              <Truck className="w-6 h-6 text-foreground/60" />
              <span className="text-xs font-semibold">Tüm Türkiye'ye Hızlı Kargo</span>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="flex flex-col items-center gap-2 text-center flex-1">
              <Shield className="w-6 h-6 text-foreground/60" />
              <span className="text-xs font-semibold">%100 Orijinal Ürün</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
