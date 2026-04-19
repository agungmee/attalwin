'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Play,
  Heart,
  Share2,
  ShieldCheck,
  RotateCcw,
  ThumbsUp,
  ChevronDown,
  MessageCircle,
  ShoppingCart,
  X,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, REVIEWS } from '../../lib/data';
import { cn } from '../../lib/utils';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { addToCart, setCheckoutItems } = useCart();
  const productId = parseInt(id);
  
  const product = useMemo(() => {
    return PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  }, [productId]);

  const mobileCarouselRef = React.useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selColor, setSelColor] = useState<string | null>(null);
  const [selSize, setSelSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const scrollToImage = (idx: number) => {
    setActiveImage(idx);
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollTo({
        left: idx * mobileCarouselRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  // Layout Constants
  const galleryImages = product.images;

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-16 md:pt-24 pb-24 md:pb-20">
      <div className="max-w-7xl mx-auto px-0 md:px-4">
        
        {/* Breadcrumbs - Hidden on Mobile */}
        <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500 mb-4 bg-white p-3 rounded-sm shadow-sm">
          <Link href="/" className="hover:text-[#f53d2d]">Attalwin Official</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-[#f53d2d] cursor-pointer">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-none md:rounded-sm shadow-sm flex flex-col md:flex-row min-h-[600px] mb-6 overflow-hidden md:overflow-visible relative">
          
          {/* Left: Image Gallery */}
          <div className="w-full md:w-[450px] p-0 md:p-4 flex flex-col space-y-4 relative">
            {/* Gallery Toolbar removed as requested */}

            <div 
              ref={mobileCarouselRef}
              className="md:hidden relative aspect-[3/4] overflow-x-auto snap-x snap-mandatory flex no-scrollbar"
              onScroll={(e) => {
                const target = e.currentTarget;
                const index = Math.round(target.scrollLeft / target.clientWidth);
                if (index !== activeImage) setActiveImage(index);
              }}
            >
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative w-full h-full shrink-0 snap-center bg-slate-50 overflow-hidden border-b border-slate-100">
                  {idx === 0 && product.video ? (
                    <video 
                      src={product.video} 
                      autoPlay 
                      muted 
                      loop 
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image 
                      src={img} 
                      alt={`${product.name} ${idx}`} 
                      fill 
                      className="object-cover" 
                      priority={idx === 0}
                    />
                  )}
                </div>
              ))}
              
              {/* Mobile Image Indicator */}
              <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-medium border border-white/10 z-10">
                {activeImage + 1}/{galleryImages.length}
              </div>
            </div>

            {/* Desktop Gallery (Hidden on Mobile) */}
            <div className="hidden md:block relative aspect-square bg-slate-50 overflow-hidden border border-slate-100 group">
              {activeImage === 0 && product.video ? (
                <video 
                  src={product.video} 
                  autoPlay 
                  muted 
                  loop 
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image 
                  src={galleryImages[activeImage]} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
                  priority
                />
              )}
            </div>

            {/* Desktop Thumbnails (Hidden on Mobile for cleaner Shopee Look) */}
            <div className="hidden md:flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setActiveImage(idx)}
                  className={cn(
                    "relative w-20 h-20 bg-slate-100 border-2 transition-all shrink-0 rounded-sm overflow-hidden",
                    activeImage === idx ? "border-[#f53d2d]" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Desktop Social Share (Hidden on Mobile Toolbar instead) */}
            <div className="hidden md:flex pt-4 items-center justify-between border-t border-slate-50">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">Share:</span>
                <div className="flex space-x-3">
                   <Share2 className="w-5 h-5 text-slate-400 cursor-pointer hover:text-[#f53d2d] transition-colors" />
                   <span className="text-xs text-slate-400 mt-1 cursor-pointer hover:underline">Salin Link</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <Heart className={cn("w-6 h-6 transition-colors", isFavorite ? "text-[#f53d2d] fill-current" : "text-slate-300 group-hover:text-[#f53d2d]")} />
                  <span className="text-sm text-slate-600">Favorit ({isFavorite ? '370' : '369'})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 p-4 md:p-6 flex flex-col">
            <div className="space-y-4">
               
               {/* Mobile Specific Pricing Display */}
               <div className="md:hidden space-y-2">
                  <div className="flex items-baseline space-x-2">
                     <span className="text-xs text-[#f53d2d] font-bold">Rp</span>
                     <span className="text-2xl font-bold text-[#f53d2d] leading-none">{product.price.toLocaleString()}</span>
                     <div className="bg-[#fff5f2] border border-[#f53d2d]/20 text-[#f53d2d] text-[10px] font-bold px-1 py-0.5 rounded-sm ml-2">Dengan Voucher</div>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                        <span className="line-through">Rp{product.originalPrice.toLocaleString()}</span>
                        <span className="bg-[#f53d2d] text-white px-1 rounded-sm">-{product.discount}</span>
                     </div>
                     <span className="text-[11px] text-slate-500">2,1RB Terjual</span>
                  </div>
               </div>

               {/* Desktop Header */}
               <div className="hidden md:block">
                  <h1 className="text-xl font-bold leading-tight">
                    {product.isMall && (
                      <span className="bg-[#f53d2d] text-white !important text-[10px] font-bold px-1.5 py-0.5 rounded-sm mr-2 align-middle uppercase tracking-tighter">ORI</span>
                    )}
                    {product.name}
                  </h1>
                  <div className="flex items-center mt-3 space-x-4 divide-x divide-slate-200">
                    <div className="flex items-center space-x-1">
                       <span className="text-[#f53d2d] border-b border-[#f53d2d] font-bold">{product.rating}</span>
                       <div className="flex text-[#f53d2d]">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                       </div>
                    </div>
                    <div className="pl-4">
                       <span className="border-b border-slate-400 font-bold">601</span>
                       <span className="ml-1 text-sm text-slate-500">Penilaian</span>
                    </div>
                    <div className="pl-4">
                       <span className="font-bold">2,1RB</span>
                       <span className="ml-1 text-sm text-slate-500">Terjual</span>
                    </div>
                  </div>
               </div>

               {/* Mobile Title (Placed after price) */}
               <div className="md:hidden mt-2">
                 <h1 className="text-lg font-bold leading-tight text-slate-900 px-1">
                    {product.name}
                 </h1>
               </div>

               {/* Mobile Horizontal Thumbnail Gallery - Total Images */}
               <div className="md:hidden flex space-x-2.5 overflow-x-auto py-2 px-0 scrollbar-none">
                 {galleryImages.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => scrollToImage(idx)}
                      className={cn(
                        "relative w-16 h-16 shrink-0 rounded-sm overflow-hidden border-2 transition-all",
                        activeImage === idx ? "border-[#f53d2d]" : "border-slate-100"
                      )}
                    >
                      <Image src={img} alt={`${product.name} thumb ${idx}`} fill className="object-cover" />
                      {idx === 0 && product.video && (
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play className="w-3 h-3 text-white fill-current" />
                         </div>
                      )}
                    </button>
                 ))}
               </div>

               {/* Desktop Price Section */}
               <div className="hidden md:flex bg-[#fafafa] p-4 flex-col space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 line-through text-sm">Rp{product.originalPrice.toLocaleString()}</span>
                    <span className="text-2xl font-bold text-[#f53d2d]">Rp{product.price.toLocaleString()}</span>
                    <span className="bg-[#f53d2d] text-white text-[10px] font-bold px-1 rounded-sm uppercase">{product.discount} OFF</span>
                  </div>
               </div>

               {/* Promotions Mobile Banner */}
               <div className="md:hidden flex items-center justify-between bg-[#fff5f2] border-y border-[#fbdcd2] -mx-4 px-4 py-2.5">
                  <div className="flex items-center space-x-2">
                     <span className="text-[10px] font-bold text-[#f53d2d] border border-[#f53d2d] px-1 rounded-sm leading-none py-0.5 uppercase tracking-tighter">Promosi</span>
                     <span className="text-[11px] text-[#f53d2d] font-medium">Hemat Rp33.284 (Berakhir dalam 1 Jam)</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-[#f53d2d]" />
               </div>

               {/* Desktop Promotions */}
               <div className="hidden md:flex items-start py-4 border-t border-slate-50">
                  <span className="w-28 text-sm text-slate-500 pt-1">Voucher Toko</span>
                  <div className="flex flex-col space-y-3 flex-1">
                    <div className="flex items-center space-x-2">
                       <div className="flex items-center space-x-2 flex-1 max-w-[300px] relative">
                          <input 
                            type="text" 
                            placeholder="Masukkan kode voucher" 
                            className="w-full border border-slate-200 rounded-sm py-2 pl-3 pr-20 text-sm focus:outline-none focus:border-[#f53d2d] transition-all"
                          />
                          <button className="absolute right-1 px-3 py-1 bg-[#f53d2d] text-white text-[11px] font-bold rounded-sm hover:bg-[#d73211]">
                             GUNAKAN
                          </button>
                       </div>
                       <span className="text-[11px] text-[#f53d2d] bg-[#fff5f2] px-2 py-1 border border-[#f53d2d]/20 rounded-sm">
                          Min. Blj Rp50RB
                       </span>
                    </div>
                  </div>
               </div>

               {/* Shipping */}
               <div className="flex items-start py-4 border-b md:border-t border-slate-50">
                  <span className="w-20 md:w-28 text-sm text-slate-500 pt-1 shrink-0">Pengiriman</span>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-start space-x-3">
                        <Truck className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                        <div className="flex flex-col flex-1 min-w-0">
                           <div className="flex items-center justify-between group cursor-pointer">
                              <div className="flex items-center space-x-2 overflow-hidden">
                                 <span className="text-slate-400 text-[13px] md:text-sm shrink-0">Ke</span>
                                 <span className="font-bold text-slate-800 text-[13px] md:text-sm truncate">KOTA JAKARTA PUSAT</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                           </div>
                           
                           <div className="hidden md:flex items-center space-x-2 text-sm mt-3">
                              <span className="text-slate-400 w-16">Kurir</span>
                              <div className="flex-1 relative">
                                <select className="w-full appearance-none bg-white border border-slate-200 rounded-sm py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-[#f53d2d] cursor-pointer">
                                  <option>J&T Express (Rp0)</option>
                                  <option>SiCepat REG (Rp5.000)</option>
                                  <option>JNE Regular (Rp12.000)</option>
                                  <option>GrabExpress Sameday (Rp25.000)</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              </div>
                           </div>

                           <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] md:text-[13px] text-slate-500">
                              <span className="text-[#f53d2d] font-bold">Rp0 - Rp25.000</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Variation Selection - Color */}
               <div className="flex flex-col items-start py-4 border-b md:border-t border-slate-50 gap-3 md:gap-0">
                  <span className="text-[13px] md:text-sm text-slate-800 font-bold md:font-normal md:text-slate-500 md:w-28">Warna</span>
                  <div className="flex flex-wrap gap-2">
                     {product.colors?.map((c: any, cIdx: number) => (
                       <button
                         key={c.name}
                         onClick={() => {
                           setSelColor(c.name);
                           if (product.video) {
                             setActiveImage(cIdx + 1);
                           } else {
                             setActiveImage(cIdx);
                           }
                         }}
                         className={cn(
                           "flex items-center space-x-2 px-1.5 py-1.5 md:px-3 md:py-1.5 border rounded-sm transition-all relative",
                           selColor === c.name ? "border-[#f53d2d] bg-[#fff5f2] text-[#f53d2d]" : "border-slate-100 md:border-slate-200 hover:border-[#f53d2d]/30"
                         )}
                       >
                         {c.image && (
                           <div className="relative w-12 h-12 md:w-6 md:h-6 rounded-sm overflow-hidden border border-slate-100">
                             <Image src={c.image} alt={c.name} fill className="object-cover" />
                             {/* Hot Indicator Mockup like on screenshot */}
                             {cIdx === 1 && (
                                <div className="absolute -top-0.5 -right-0.5 z-10">
                                   <i className="fa-solid fa-fire text-[10px] text-[#f53d2d]"></i>
                                </div>
                             )}
                           </div>
                         )}
                         <span className="hidden md:inline text-xs font-medium">{c.name}</span>
                         {selColor === c.name && (
                            <div className="absolute bottom-0 right-0">
                               <div className="w-2 h-2 bg-[#f53d2d] flex items-center justify-center rounded-tl-sm">
                                  <div className="w-1 h-0.5 bg-white rotate-[-45deg] translate-y-[-0.5px] translate-x-[0.2px]"></div>
                               </div>
                            </div>
                         )}
                       </button>
                     ))}
                  </div>
               </div>

                <div className="flex flex-col items-start py-4 gap-3 md:gap-0">
                  <div className="flex items-center justify-between w-full md:w-auto md:block">
                    <div className="flex items-center space-x-2">
                       <span className="text-[13px] md:text-sm text-slate-800 font-bold md:font-normal md:text-slate-500 md:w-28">Ukuran: {selSize || 'Pilih'}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3 flex-1 w-full">
                    <div className="flex flex-wrap gap-2">
                       {product.sizes?.map((s: string) => (
                         <button
                           key={s}
                           onClick={() => setSelSize(s)}
                           className={cn(
                             "min-w-[60px] md:min-w-12 px-4 md:px-5 py-2 text-[13px] md:text-sm border rounded-sm transition-all font-medium",
                             selSize === s ? "border-[#f53d2d] bg-[#fff5f2] text-[#f53d2d]" : "bg-slate-50 border-transparent text-slate-600 md:border-slate-200 md:bg-white"
                           )}
                         >
                           {s}
                         </button>
                       ))}
                    </div>
                    {/* Size Guide Info Desktop */}
                    <button className="hidden md:flex text-[11px] text-[#0066cc] hover:underline items-center">
                       Tabel Ukuran <ChevronRight className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>
               </div>

               {/* Quantity - Hidden on Mobile (part of Cart process) */}
               <div className="hidden md:flex items-center py-4 border-t border-slate-50">
                  <span className="w-28 text-sm text-slate-500">Kuantitas</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-slate-200 rounded-sm overflow-hidden">
                       <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-3 py-1.5 border-r hover:bg-slate-50"><Minus className="w-4 h-4" /></button>
                       <span className="px-6 font-medium text-sm">{qty}</span>
                       <button onClick={() => setQty(q => q+1)} className="px-3 py-1.5 border-l hover:bg-slate-50"><Plus className="w-4 h-4" /></button>
                    </div>
                    <span className="text-sm text-slate-400">Tersisa 1.243 buah</span>
                  </div>
               </div>

               {/* Action Buttons - Desktop Only */}
               <div className="hidden md:flex items-center space-x-4 pt-6">
                  <button 
                    onClick={() => {
                      if (!selColor || !selSize) return alert('Silakan pilih variasi terlebih dahulu');
                      addToCart(product, selColor, selSize, qty);
                    }}
                    className="flex-1 max-w-[250px] py-4 border border-[#f53d2d] bg-[#fff5f2] text-[#f53d2d] font-bold rounded-sm hover:bg-[#ffdfd6] transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Masukkan Keranjang</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (!selColor || !selSize) return alert('Silakan pilih variasi terlebih dahulu');
                      setCheckoutItems([{ ...product, color: selColor, size: selSize, quantity: qty }]);
                      router.push('/checkout');
                    }}
                    className="flex-1 max-w-[250px] py-4 bg-[#f53d2d] text-white font-bold rounded-sm hover:bg-[#d73211] transition-all shadow-lg shadow-[#f53d2d]/20 uppercase tracking-wide"
                  >
                    Beli Sekarang
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="md:hidden fixed bottom-1 left-0 right-0 z-50 px-2">
            <div className="bg-white rounded-lg shadow-[0_-4px_20px_rgba(0,0,0,0.1)] overflow-hidden flex h-14 border border-slate-100">
               <button 
                 onClick={() => {
                   if (!selColor || !selSize) return alert('Silakan pilih variasi');
                   addToCart(product, selColor, selSize, 1);
                 }}
                 className="w-1/2 bg-white text-[#f53d2d] font-bold flex items-center justify-center space-x-2 border-r border-slate-50 active:bg-slate-50"
               >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm">Keranjang</span>
               </button>
               
               <button 
                 onClick={() => {
                   if (!selColor || !selSize) return alert('Silakan pilih variasi');
                   setCheckoutItems([{ ...product, color: selColor, size: selSize, quantity: 1 }]);
                   router.push('/checkout');
                 }}
                 className="w-1/2 bg-[#f53d2d] text-white font-bold flex flex-col items-center justify-center"
               >
                  <div className="text-[10px] font-medium opacity-90 leading-none mb-0.5">Beli Sekarang</div>
                  <div className="text-sm leading-none">Rp{product.price.toLocaleString()}</div>
               </button>
            </div>
        </div>

        {/* Details & Description - Styled for and Responsive */}
        <div className="mt-2 md:mt-6 space-y-2 md:space-y-6">
          
          {/* Mobile Description Block (Simplified) */}
          <div className="bg-white p-4 md:p-6 rounded-none md:rounded-sm shadow-sm border-b md:border border-slate-100">
            <div className="flex items-center space-x-2 mb-4 md:mb-8">
              <div className="w-1 h-5 bg-[#f53d2d]"></div>
              <h2 className="text-sm md:text-base font-bold uppercase tracking-wide">Deskripsi Produk</h2>
            </div>
            
            <div className={cn("space-y-6 text-[13px] md:text-[15px] leading-relaxed text-slate-700", !descExpanded && "max-h-24 overflow-hidden relative")}>
               <div>
                 <p className="font-bold text-slate-900 mb-2">Attalwin Kurta Premium</p>
                 <p>Tampil elegan dan berwibawa dengan kurta pria berbahan katun premium dari Attalwin. Dirancang khusus untuk kenyamanan dan gaya modern tanpa meninggalkan kesan islami.</p>
                 <p className="mt-4">Setelan kurta ramah kantong dengan kualitas bintang lima. Jahitan rapi dan kuat, cocok untuk ibadah maupun acara formal lainnya.</p>
               </div>
               
               {!descExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
               )}
            </div>

             <div 
                onClick={() => setDescExpanded(!descExpanded)}
                className="text-[#f53d2d] font-bold text-[13px] text-center border-t border-slate-50 pt-4 cursor-pointer flex items-center justify-center"
             >
                {descExpanded ? 'Lihat Sedikit' : 'Lihat Selengkapnya'} 
                <ChevronDown className={cn("w-4 h-4 ml-1 transition-transform", descExpanded && "rotate-180")} />
             </div>
          </div>

          {/* Size Guide Section (Keep desktop table, maybe hide on mobile or simplify) */}
          <div className="hidden md:block bg-white p-6 rounded-sm shadow-sm border border-slate-100">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-1 h-5 bg-[#f53d2d]"></div>
              <h2 className="text-base font-bold uppercase tracking-wide">Panduan Ukuran</h2>
            </div>
            
            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-4 px-4 font-bold text-slate-700 border-r border-slate-100 w-32">INT</th>
                    <th className="py-4 px-4 font-bold text-slate-700 border-r border-slate-100">Tinggi badan model</th>
                    <th className="py-4 px-4 font-bold text-slate-700 border-r border-slate-100">Lingkar Dada</th>
                    <th className="py-4 px-4 font-bold text-slate-700">Panjang Lengan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[{ int: "S", tinggi: "91-91", dada: "110", lengan: "52" },
                    { int: "M", tinggi: "94-94", dada: "116", lengan: "54" },
                    { int: "L", tinggi: "97-97", dada: "122", lengan: "56" },
                    { int: "XL", tinggi: "100-100", dada: "128", lengan: "58" },
                    { int: "XXL", tinggi: "103-103", dada: "134", lengan: "60" }].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-4 px-4 font-medium border-r border-slate-100 bg-slate-50/30">{row.int}</td>
                      <td className="py-4 px-4 text-slate-600 border-r border-slate-100">{row.tinggi}</td>
                      <td className="py-4 px-4 text-slate-600 border-r border-slate-100">{row.dada}</td>
                      <td className="py-4 px-4 text-slate-600">{row.lengan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Product Reviews */}
          <div className="bg-white p-4 md:p-6 rounded-none md:rounded-sm shadow-sm border-b md:border border-slate-100 pb-20 md:pb-6">
            <div className="flex items-center justify-between mb-4 md:mb-8">
               <div className="flex items-center space-x-2">
                  <div className="w-1 h-5 bg-[#f53d2d]"></div>
                  <h2 className="text-sm md:text-base font-bold uppercase tracking-wide">Penilaian Produk</h2>
               </div>
               <div className="text-[#f53d2d] text-[11px] md:text-sm font-medium flex items-center">
                  Lihat Semua <ChevronRight className="w-3 h-3 ml-1" />
               </div>
            </div>

            {/* Simplified Mobile Rating Info */}
            <div className="flex items-center space-x-2 md:hidden mb-4">
               <div className="flex items-center text-[#f53d2d]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
               </div>
               <span className="text-xs font-bold text-[#f53d2d]">4.9/5</span>
               <span className="text-[11px] text-slate-400">(601 Penilaian)</span>
            </div>

            {/* Desktop Rating Box */}
            <div className="hidden md:flex bg-[#fffbf8] border border-[#fbdcd2] p-8 rounded-sm mb-8 items-center gap-12">
               <div className="flex flex-col items-center flex-shrink-0">
                  <div className="text-[#f53d2d] text-2xl font-medium mb-1">
                    <span className="text-3xl font-bold">4.9</span> dari 5
                  </div>
                  <div className="flex items-center space-x-1 text-[#f53d2d]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
               </div>
               <div className="flex flex-wrap gap-2.5 flex-1">
                  {["Semua", "5 Bintang (711)", "4 Bintang (54)", "3 Bintang (10)", "2 Bintang (0)", "1 Bintang (3)"].map((tag, i) => (
                    <button key={tag} className={cn("px-4 py-1.5 border border-slate-200 bg-white text-sm rounded-sm hover:border-[#f53d2d] hover:text-[#f53d2d]", i === 0 && "border-[#f53d2d] text-[#f53d2d]")}>{tag}</button>
                  ))}
               </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6 divide-y divide-slate-50">
               {REVIEWS.map((review) => (
                 <div key={review.id} className="pt-6 flex space-x-4">
                    <div className="flex-shrink-0">
                       <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-50">
                          <Image src={review.avatar} alt={review.user} fill className="object-cover" />
                       </div>
                    </div>
                    <div className="flex-1 space-y-2">
                       <div className="flex flex-col">
                          <span className="text-[12px] md:text-xs font-medium text-slate-900">{review.user}</span>
                          <div className="flex items-center text-[#f53d2d] my-1">
                             {[...Array(5)].map((_, i) => (
                               <Star 
                                 key={i} 
                                 className={cn("w-2.5 h-2.5", i < review.rating ? "fill-current" : "text-slate-200")} 
                               />
                             ))}
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                             <span>{review.date}</span>
                             <span className="text-slate-200">|</span>
                             <span>Variasi: {review.variant}</span>
                          </div>
                       </div>
                       
                       <p className="text-[13px] text-slate-700 leading-relaxed py-1">
                          {review.comment}
                       </p>

                       {review.images && review.images.length > 0 && (
                          <div className="flex flex-wrap gap-2 py-2">
                             {review.images.map((img, imgIdx) => (
                                <div key={imgIdx} className="relative w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border border-slate-100 cursor-zoom-in">
                                   <Image src={img} alt="Review" fill className="object-cover" />
                                </div>
                             ))}
                          </div>
                       )}

                       <div className="flex items-center space-x-4 text-xs pt-2">
                          <button className="flex items-center space-x-1.5 text-slate-400 hover:text-[#f53d2d] transition-colors group">
                             <ThumbsUp className="w-4 h-4" />
                             <span className="group-hover:text-[#f53d2d]">{review.likes}</span>
                          </button>
                          <button className="text-slate-400 hover:text-slate-600">Terbantu?</button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
