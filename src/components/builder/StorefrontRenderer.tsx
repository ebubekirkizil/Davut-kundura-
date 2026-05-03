"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronRight, Info, Wrench } from 'lucide-react';

// --- TİPLER ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrls: string[];
  description: string;
  isCrafted?: boolean;
}

// --- ANİMASYON VARYANTLARI ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function StorefrontRenderer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Scroll Dinleyicisi
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GERÇEK API'den Veri Çekme
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/shop/storefront');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Ürünler yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden">
      
      {/* 1. DYNAMIC HEADER */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'glass-header py-4' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Menu className="w-6 h-6 text-espresso cursor-pointer hover:text-gold transition-colors" />
          <h1 className="font-serif text-2xl tracking-widest uppercase text-espresso">
            Davut Kundura
          </h1>
          <div className="relative group cursor-pointer">
            <ShoppingBag className="w-6 h-6 text-espresso group-hover:text-gold transition-colors" />
            <span className="absolute -top-2 -right-2 bg-gold text-espresso text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </div>
        </div>
      </motion.header>

      {/* 2. CINEMATIC HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cream via-[#f0ebe1] to-[#e6dfd1] opacity-70"></div>
          <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Hero Background"
          />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <motion.span variants={fadeInUp} className="text-gold tracking-[0.3em] text-sm md:text-base font-medium mb-4 block uppercase">
            Est. 1990 • Pendik, İstanbul
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif text-espresso leading-tight mb-6">
            Mirasın <br/> <span className="italic font-light">Zarafeti</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-espresso/70 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Üç on yılı aşkın ustalık. El yapımı deri sanatının, modern estetik ve kusursuz kaliteyle buluştuğu şaheserler.
          </motion.p>
          <motion.button variants={fadeInUp} className="bg-espresso text-cream px-10 py-4 rounded-none hover:bg-gold transition-colors duration-300 font-sans tracking-wide uppercase text-sm flex items-center mx-auto space-x-2 shadow-2xl">
            <span>Koleksiyonu Keşfet</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* 3. HERITAGE SECTION */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h3 className="font-serif text-3xl md:text-5xl text-espresso mb-6">Ustalığın İmzası</h3>
            <p className="text-espresso/70 font-sans leading-relaxed mb-6">
              Her bir dikişte, Pendik'teki o ilk atölyemizin ruhunu taşıyoruz. İster tamamen size özel el yapımı bir Oxford ayakkabı olsun, isterse yıllanmış valizinizin titiz bir restorasyonu... Bizim için deri, sadece bir materyal değil; işlenmeyi bekleyen bir mirastır.
            </p>
            <div className="flex items-center space-x-4 text-sm font-serif uppercase tracking-widest text-gold">
              <Wrench className="w-5 h-5" />
              <span>Premium Lostra & Onarım</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] bg-gray-200 relative overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1542261777448-23d2a287091c?q=80&w=1000&auto=format&fit=crop" 
              alt="Deri İşçiliği Ustalığı" 
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. INTERACTIVE PRODUCT GRID */}
      <section className="py-24 bg-espresso text-cream px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h3 className="font-serif text-3xl md:text-5xl text-cream">Seçkin Parçalar</h3>
            <span className="text-gold hidden md:block text-sm uppercase tracking-widest border-b border-gold pb-1 cursor-pointer hover:text-white hover:border-white transition-all">Tümünü Gör</span>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {loading ? (
              [1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse"></div>)
            ) : products.map((product) => (
              <motion.div 
                key={product.id} 
                variants={fadeInUp}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A] mb-4">
                  <img 
                    src={product.imageUrls?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop'} 
                    alt={product.name}
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {product.isCrafted && (
                    <div className="absolute top-4 left-4 bg-gold text-espresso text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
                      El Yapımı
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-gold text-xs uppercase tracking-wider mb-1">{product.category || "Koleksiyon"}</span>
                  <h4 className="font-serif text-lg text-cream mb-2 group-hover:text-gold transition-colors">{product.name}</h4>
                  <span className="font-sans text-cream/70 font-light">₺{product.price.toLocaleString('tr-TR')}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. CINEMATIC QUICK VIEW MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-espresso/80 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-cream flex flex-col md:flex-row shadow-2xl overflow-hidden z-10"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 text-espresso/50 hover:text-espresso transition-colors p-2 hover:bg-espresso/5 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100">
                <img 
                  src={selectedProduct.imageUrls?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop'} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <span className="text-gold text-sm uppercase tracking-widest mb-2 font-medium">{selectedProduct.category || "El Yapımı"}</span>
                <h2 className="font-serif text-3xl md:text-5xl text-espresso mb-6">{selectedProduct.name}</h2>
                <p className="font-sans text-espresso/70 font-light leading-relaxed mb-8 text-lg">
                  {selectedProduct.description || "Geleneksel yöntemlerle, birinci sınıf dana derisinden tamamen elde üretilmiştir. Her bir çift, usta ellerde günlerce süren titiz bir çalışmanın ürünüdür."}
                </p>
                <div className="text-3xl font-sans font-medium text-espresso mb-10">
                  ₺{selectedProduct.price.toLocaleString('tr-TR')}
                </div>
                
                <div className="flex space-x-4 mt-auto">
                  <button className="flex-1 bg-espresso text-cream py-5 uppercase tracking-[0.2em] text-sm font-bold hover:bg-gold transition-colors shadow-xl">
                    Siparişe Başla
                  </button>
                  <button className="p-5 border border-espresso/20 text-espresso hover:bg-espresso hover:text-cream transition-colors">
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
