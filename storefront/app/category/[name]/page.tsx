'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, PRODUCTS } from '../../lib/data';
import { ProductCard } from '../../components/ProductCard';
import { cn } from '../../lib/utils';
import { ChevronRight, ChevronDown, ChevronLeft, Minus, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const activeCategory = decodeURIComponent(name);
  const { addToCart } = useCart();
  
  const [sortBy, setSortBy] = useState("Populer");
  
  // Variation Modal State (Reusing from Home)
  const [variationModalOpen, setVariationModalOpen] = useState(false);
  const [selectedProductForVariation, setSelectedProductForVariation] = useState<any>(null);
  const [selColor, setSelColor] = useState<string | null>(null);
  const [selSize, setSelSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => p.category === activeCategory);
    if (sortBy === "Terbaru") {
      result = [...result].reverse(); 
    } else if (sortBy === "Harga: Rendah ke Tinggi") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Harga: Tinggi ke Rendah") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#f53d2d]">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-medium">{activeCategory}</span>
        </nav>

        <div className="flex gap-6">
          
          {/* Sidebar */}
          <aside className="hidden md:block w-60 shrink-0">
             <div className="bg-white rounded-sm border border-slate-100 overflow-hidden sticky top-24">
                <div className="p-4 border-b border-slate-50 flex items-center space-x-2">
                   <div className="w-1 h-4 bg-[#f53d2d]"></div>
                   <h3 className="font-bold text-sm uppercase tracking-wide">Kategori</h3>
                </div>
                <div className="py-2">
                   {CATEGORIES.map((cat) => (
                     <Link 
                       key={cat.name}
                       href={`/category/${encodeURIComponent(cat.name)}`}
                       className={cn(
                         "flex items-center space-x-3 px-4 py-3 transition-colors text-sm font-medium",
                         activeCategory === cat.name 
                          ? "bg-[#fff5f2] text-[#f53d2d]" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#f53d2d]"
                       )}
                     >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-100">
                           <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                        </div>
                        <span className="flex-1">{cat.name}</span>
                        {activeCategory === cat.name && <ChevronRight className="w-4 h-4" />}
                     </Link>
                   ))}
                </div>

                <div className="p-4 border-t border-slate-50">
                   <h3 className="font-bold text-xs uppercase tracking-wide mb-4 text-slate-400">Filter Lainnya</h3>
                   <div className="space-y-4">
                      {/* Placeholder filters for aesthetic */}
                      <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">Lokasi</div>
                        <div className="space-y-2">
                           {["Jakarta", "Jawa Barat", "Jawa Tengah"].map(loc => (
                             <label key={loc} className="flex items-center space-x-2 text-xs text-slate-600 cursor-not-allowed opacity-60">
                                <input type="checkbox" className="rounded-sm border-slate-300" disabled />
                                <span>{loc}</span>
                             </label>
                           ))}
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            
            {/* Header Content */}
            <div className="bg-white p-4 rounded-sm border border-slate-100">
               <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold text-slate-800">{activeCategory}</h1>
                  <span className="text-sm text-slate-500">{filteredProducts.length} Produk ditemukan</span>
               </div>
               
               {/* Sort bar (mobile-friendly version of the Home sort bar) */}
               {/* Sort bar (Responsive) */}
               <div className="bg-[#ededed] p-2 rounded-sm flex items-center justify-between">
                  {/* Desktop Sorting UI */}
                  <div className="hidden md:flex items-center space-x-2">
                     <span className="text-sm text-slate-500 mr-2 ml-1">Urutkan</span>
                     {["Populer", "Terbaru", "Terlaris"].map((sort) => (
                       <button
                         key={sort}
                         onClick={() => setSortBy(sort)}
                         className={cn(
                           "px-4 py-1.5 text-sm rounded-sm transition-all font-medium border border-transparent shadow-sm",
                           sortBy === sort ? "bg-[#f53d2d] text-white" : "bg-white text-slate-800 hover:text-[#f53d2d]"
                         )}
                       >
                         {sort}
                       </button>
                     ))}
                     <div className="relative group">
                        <button className="px-4 py-1.5 text-sm bg-white text-slate-800 rounded-sm flex items-center min-w-[140px] justify-between shadow-sm font-medium border border-transparent hover:text-[#f53d2d] transition-colors">
                          {sortBy.startsWith("Harga") ? sortBy : "Harga"} <ChevronDown className="ml-2 w-4 h-4" />
                        </button>
                        <div className="absolute top-[calc(100%+2px)] left-0 right-0 bg-white shadow-xl rounded-sm py-2 hidden group-hover:block z-20 border border-slate-100">
                           <div onClick={() => setSortBy("Harga: Rendah ke Tinggi")} className="px-4 py-2 text-sm hover:text-[#f53d2d] cursor-pointer">Harga: Rendah ke Tinggi</div>
                           <div onClick={() => setSortBy("Harga: Tinggi ke Rendah")} className="px-4 py-2 text-sm hover:text-[#f53d2d] cursor-pointer">Harga: Tinggi ke Rendah</div>
                        </div>
                     </div>
                  </div>

                  {/* Mobile Sorting UI (Split 50/50) */}
                  <div className="md:hidden flex items-center gap-2 w-full">
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

                  <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
                     <span>1/1</span>
                     <div className="flex border border-slate-200 bg-white shadow-sm rounded-sm">
                        <button className="p-1 px-2 border-r disabled:opacity-30" disabled><ChevronLeft className="w-4 h-4" /></button>
                        <button className="p-1 px-2 disabled:opacity-30" disabled><ChevronRight className="w-4 h-4" /></button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {filteredProducts.map((product, idx) => (
                  <ProductCard 
                    key={`${product.id}-${idx}`}
                    product={product}
                    onAddVariantClick={(p) => {
                      setSelectedProductForVariation(p);
                      setVariationModalOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white py-20 rounded-sm border border-slate-100 flex flex-col items-center justify-center text-slate-400 space-y-4">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <X className="w-10 h-10" />
                 </div>
                 <p className="font-medium">Belum ada produk di kategori ini</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Variation Modal (Same as Home) */}
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
  );
}
