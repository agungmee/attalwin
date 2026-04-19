'use client';

import Image from "next/image";
import Link from 'next/link';
import { useState, useCallback, useMemo } from "react";
import { 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  ArrowRight,
  ChevronDown,
  Play,
  X,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./context/CartContext";
import { cn } from "./lib/utils";
import { BANNERS, CATEGORIES, PRODUCTS } from "./lib/data";
import { ProductCard } from "./components/ProductCard";

export default function Home() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Semua Produk");
  const [sortBy, setSortBy] = useState("Populer");
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Variation Modal State
  const [variationModalOpen, setVariationModalOpen] = useState(false);
  const [selectedProductForVariation, setSelectedProductForVariation] = useState<any>(null);
  const [selColor, setSelColor] = useState<string | null>(null);
  const [selSize, setSelSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  // Auto-slide logic
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  }, []);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (selectedCategory !== "Semua Produk") {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (sortBy === "Terbaru") {
      result = [...result].reverse(); 
    } else if (sortBy === "Harga: Rendah ke Tinggi") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Harga: Tinggi ke Rendah") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    // Ensure exactly 12 products (2 rows of 6) by repeating if necessary
    return Array.from({ length: 12 }, (_, i) => result[i % result.length]);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-16">
      
      {/* Main Content Area */}
      <div className="w-full pb-20 space-y-4">
        
        {/* Hero Section Slider */}
        <section className="relative h-[300px] md:h-[500px] bg-slate-900 overflow-hidden shadow-sm group">
          <AnimatePresence mode="wait">
             <motion.div
               key={currentSlide}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8 }}
               className="absolute inset-0"
             >
               <Link href={BANNERS[currentSlide].link} className="block relative w-full h-full">
                 <Image 
                   src={BANNERS[currentSlide].image}
                   alt={`Banner ${currentSlide + 1}`}
                   fill
                   className="object-cover"
                   priority
                 />
                 <div className={cn("absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent", BANNERS[currentSlide].color)} />
               </Link>
             </motion.div>
          </AnimatePresence>

          {/* Slider Dots */}
          <div className="absolute bottom-10 left-12 flex space-x-3 z-20">
            {BANNERS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentSlide === i ? "bg-[#f53d2d] w-10" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </section>

        <div className="px-4 space-y-4">
          <div className="bg-[#ededed] p-3 rounded-sm flex items-center justify-between">
            {/* Desktop Sorting UI */}
            <div className="hidden md:flex items-center space-x-4">
              {["Populer", "Terbaru", "Terlaris"].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-sm transition-all shadow-sm font-medium",
                    sortBy === sort ? "bg-[#f53d2d] text-white" : "bg-white text-slate-800 hover:text-[#f53d2d]"
                  )}
                >
                  {sort}
                </button>
              ))}
              
              <div className="relative group/sort">
                <button className="px-4 py-2 text-sm bg-white text-slate-800 rounded-sm flex items-center min-w-[140px] justify-between shadow-sm font-medium hover:text-[#f53d2d] transition-colors">
                  {sortBy.startsWith("Harga") ? sortBy : "Harga"} <ChevronDown className="ml-2 w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 right-0 h-2" />
                <div className="absolute top-[calc(100%+2px)] left-0 right-0 bg-white shadow-xl rounded-sm py-2 opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all z-20 border border-slate-100">
                   <div onClick={() => setSortBy("Harga: Rendah ke Tinggi")} className="px-4 py-2 text-sm hover:text-[#f53d2d] cursor-pointer">Harga: Rendah ke Tinggi</div>
                   <div onClick={() => setSortBy("Harga: Tinggi ke Rendah")} className="px-4 py-2 text-sm hover:text-[#f53d2d] cursor-pointer">Harga: Tinggi ke Rendah</div>
                </div>
              </div>
            </div>

            {/* Mobile Sorting UI (Split 50/50) */}
            <div className="md:hidden flex items-center gap-2 w-full">
              {/* Main Sort Select */}
              <div className="relative w-1/2">
                <select 
                  value={["Populer", "Terbaru", "Terlaris"].includes(sortBy) ? sortBy : "Lainnya"}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-sm px-3 py-2 text-[13px] font-bold shadow-sm outline-none appearance-none pr-8 text-slate-800"
                >
                  <option value="Populer">Populer</option>
                  <option value="Terbaru">Terbaru</option>
                  <option value="Terlaris">Terlaris</option>
                  {sortBy.startsWith("Harga") && <option value="Lainnya">Terpilih: Harga</option>}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#f53d2d] pointer-events-none" />
              </div>

              {/* Price Sort Select */}
              <div className="relative w-1/2">
                <select 
                  value={sortBy.startsWith("Harga") ? sortBy : "Harga"}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={cn(
                    "w-full bg-white border rounded-sm px-3 py-2 text-[13px] font-bold shadow-sm outline-none appearance-none pr-8",
                    sortBy.startsWith("Harga") ? "border-[#f53d2d] text-[#f53d2d]" : "border-slate-100 text-slate-800"
                  )}
                >
                  <option value="Harga" disabled={sortBy.startsWith("Harga")}>Harga</option>
                  <option value="Harga: Rendah ke Tinggi">Rendah ke Tinggi</option>
                  <option value="Harga: Tinggi ke Rendah">Tinggi ke Rendah</option>
                </select>
                <ChevronDown className={cn("absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none", sortBy.startsWith("Harga") ? "text-[#f53d2d]" : "text-slate-400")} />
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 text-sm text-slate-600">
               <span className="font-medium">1/2</span>
               <div className="flex border border-slate-200 bg-white shadow-sm overflow-hidden rounded-sm">
                  <button className="p-2 border-r hover:bg-slate-50 disabled:opacity-30" disabled><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-slate-50 text-[#f53d2d]"><ChevronRight className="w-4 h-4" /></button>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {filteredProducts.map((product, idx) => (
              <ProductCard 
                key={`${product.id}-${idx}`}
                product={product}
                idx={idx}
                onAddVariantClick={(p) => {
                  setSelectedProductForVariation(p);
                  setVariationModalOpen(true);
                }}
              />
            ))}
          </div>

          {/* New Category Section */}
          <div className="pt-10">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center space-x-2">
                  <div className="w-1 h-5 bg-[#f53d2d]"></div>
                  <h2 className="text-base font-bold uppercase tracking-wide">Kategori Pilihan</h2>
               </div>
               <Link href="/category/Gamis%20Setelan" className="text-[#f53d2d] text-sm hover:underline">
                  Lihat Semua
               </Link>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
               {CATEGORIES.map((cat) => (
                 <Link 
                   href={`/category/${encodeURIComponent(cat.name)}`}
                   key={cat.name}
                   className={cn(
                     "bg-white p-4 rounded-sm border transition-all flex flex-col items-center space-y-3 group",
                     selectedCategory === cat.name ? "border-[#f53d2d] shadow-md ring-1 ring-[#f53d2d]/20" : "border-slate-100 hover:border-[#f53d2d]/30 hover:shadow-lg"
                   )}
                 >
                   <div className="relative w-16 h-16 md:w-24 md:h-24 bg-slate-50 rounded-full overflow-hidden transition-transform group-hover:scale-105">
                     <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                   </div>
                   <span className={cn(
                     "text-center text-[10px] md:text-xs font-bold uppercase tracking-tight transition-colors",
                     selectedCategory === cat.name ? "text-[#f53d2d]" : "text-slate-600 group-hover:text-[#f53d2d]"
                   )}>
                     {cat.name}
                   </span>
                 </Link>
               ))}
            </div>
          </div>

          {/* New Brand Value Section */}
          <div className="pt-16 pb-10">
            <div className="flex flex-col items-center text-center mb-10">
               <h2 className="text-2xl md:text-3xl font-serif italic text-slate-800 mb-2">Pilihan Utama Fashion Muslim</h2>
               <div className="w-12 h-0.5 bg-[#f53d2d] mb-4"></div>
               <p className="text-slate-500 text-sm max-w-lg">Attalwin berkomitmen memberikan pengalaman busana muslim terbaik dengan kualitas premium dan desain yang modern.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
               {[
                 { icon: "fa-gem", title: "Kualitas Premium", desc: "Bahan pilihan terbaik dengan standar kontrol kualitas yang ketat." },
                 { icon: "fa-palette", title: "Desain Eksklusif", desc: "Koleksi terbatas dengan perpaduan gaya klasik dan modern." },
                 { icon: "fa-bolt-lightning", title: "Pengiriman Cepat", desc: "Pesanan Anda diproses dan dikirim di hari yang sama." },
                 { icon: "fa-shield-halved", title: "Garansi Kepuasan", desc: "Kami menjamin kualitas produk atau uang Anda kembali." }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-8 rounded-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-[#fff5f2] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#f53d2d] transition-colors duration-300">
                       <i className={`fa-solid ${item.icon} text-2xl text-[#f53d2d] group-hover:text-white transition-colors duration-300`}></i>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-3 uppercase tracking-wider text-sm">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

      <AnimatePresence>
         {variationModalOpen && selectedProductForVariation && (
           <>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVariationModalOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200]" />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white z-[201] rounded-sm shadow-2xl overflow-hidden" >
               <div className="flex p-6 gap-6 relative">
                 <button onClick={() => setVariationModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
                 <div className="relative w-32 h-32 bg-slate-100 rounded-sm overflow-hidden shrink-0 border border-slate-100">
                   <Image src={selectedProductForVariation.images[0]} alt={selectedProductForVariation.name} fill className="object-cover" />
                 </div>
                 <div className="flex flex-col justify-end pb-2">
                   <div className="text-[#f53d2d] text-2xl font-bold">Rp {selectedProductForVariation.price.toLocaleString('id-ID')}</div>
                   <div className="text-slate-400 text-sm italic">Pilih Variasi untuk melihat stok</div>
                 </div>
               </div>
               <div className="px-6 py-4 space-y-6 border-t border-slate-50">
                 <div>
                   <div className="text-sm text-slate-500 mb-3 uppercase tracking-wider font-bold">Warna</div>
                   <div className="flex flex-wrap gap-2">
                     {selectedProductForVariation.colors?.map((c: any) => (
                       <button key={c.name} onClick={() => setSelColor(c.name)} className={cn("flex items-center space-x-2 px-3 py-1.5 border rounded-sm transition-all", selColor === c.name ? "border-[#f53d2d] bg-[#fff5f2] text-[#f53d2d]" : "border-slate-200 hover:border-[#f53d2d]/30")}>
                         <div className="relative w-5 h-5 overflow-hidden rounded-sm border border-black/5"><Image src={c.image} alt={c.name} fill className="object-cover" /></div>
                         <span className="text-xs font-medium">{c.name}</span>
                       </button>
                     ))}
                   </div>
                 </div>
                 <div>
                   <div className="text-sm text-slate-500 mb-3 uppercase tracking-wider font-bold">Ukuran</div>
                   <div className="flex flex-wrap gap-2">
                     {selectedProductForVariation.sizes?.map((s: string) => (
                       <button key={s} onClick={() => setSelSize(s)} className={cn("min-w-12 px-4 py-2 text-sm border rounded-sm transition-all font-medium", selSize === s ? "border-[#f53d2d] bg-[#fff5f2] text-[#f53d2d]" : "border-slate-200 hover:border-[#f53d2d]/30")}>{s}</button>
                     ))}
                   </div>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Jumlah</div>
                   <div className="flex items-center border border-slate-200 rounded-sm">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-slate-50 border-r border-slate-200 transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="px-6 font-bold">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:bg-slate-50 border-l border-slate-200 transition-colors"><Plus className="w-4 h-4" /></button>
                   </div>
                 </div>
               </div>
               <div className="p-6 bg-slate-50 flex gap-4">
                 <button 
                  disabled={!selColor || !selSize}
                  onClick={() => { addToCart(selectedProductForVariation, selColor!, selSize!, qty); setVariationModalOpen(false); setSelColor(null); setSelSize(null); setQty(1); }}
                  className={cn("flex-1 py-4 font-bold uppercase tracking-widest text-sm rounded-sm transition-all shadow-lg", (!selColor || !selSize) ? "bg-slate-300 text-white cursor-not-allowed shadow-none" : "bg-[#f53d2d] text-white hover:bg-[#d73211] shadow-[#f53d2d]/20")}
                 > Konfirmasi & Masukkan Keranjang </button>
               </div>
             </motion.div>
           </>
         )}
      </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
