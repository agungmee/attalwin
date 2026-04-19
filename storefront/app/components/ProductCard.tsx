'use client';

import Image from "next/image";
import Link from 'next/link';
import { motion } from "framer-motion";
import { Star, Plus, Play } from 'lucide-react';
import { cn } from "../lib/utils";

interface ProductCardProps {
  product: any;
  onAddVariantClick?: (product: any) => void;
  idx?: number;
}

export function ProductCard({ product, onAddVariantClick, idx }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-transparent hover:border-[#f53d2d] hover:shadow-xl transition-all group flex flex-col relative"
    >
      <div className="relative aspect-square overflow-hidden">
         <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
         {product.promoXtra && (
           <div className="absolute bottom-2 left-2 flex flex-col items-start gap-1">
              <div className="bg-[#ffc107] text-black text-[9px] font-bold px-1 py-0.5 rounded-sm uppercase italic">PROMO XTRA</div>
           </div>
         )}
         {product.video && (
           <div className="absolute bottom-2 right-2 flex items-center justify-center w-6 h-6 bg-black/40 rounded-full text-white">
              <Play className="w-3 h-3 fill-current" />
           </div>
         )}
      </div>

      <div className="p-2 flex-1 flex flex-col space-y-1.5">
         <Link 
          href={`/product/${product.id}`}
          className="line-clamp-2 text-[11px] h-10 leading-tight hover:text-[#f53d2d] transition-colors cursor-pointer group-hover:underline decoration-[#f53d2d]/20"
         >
           {product.isMall && <span className="bg-[#f53d2d] text-white !important text-[8px] font-bold px-1 py-0 rounded-sm mr-1.5 align-middle uppercase">ORI</span>}
           {product.name}
         </Link>
        <div className="flex items-center space-x-2 mt-auto">
          <span className="text-[#f53d2d] text-base font-bold">Rp {product.price.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-white bg-[#f53d2d] px-1 rounded-sm">-{product.discount}</span>
          <span className="text-[10px] text-slate-400 line-through">Rp {product.originalPrice?.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-[#ffc107] fill-current" />
            <span className="text-[10px] text-slate-500 ml-1">{product.rating}</span>
          </div>
          <span className="text-[10px] text-slate-500">{product.soldCount}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-slate-100">
         <Link 
          href={`/product/${product.id}`} 
          className="py-3 text-[10px] font-extrabold uppercase tracking-widest bg-[#f53d2d] text-white hover:bg-[#d73211] flex items-center justify-center border-r border-slate-100 transition-all font-sans"
         >
           Details
         </Link>
         <button 
          onClick={() => onAddVariantClick?.(product)} 
          className="py-3 text-[10px] font-extrabold uppercase tracking-widest text-[#f53d2d] hover:bg-[#fff5f2] flex items-center justify-center transition-all font-sans"
         >
           <Plus className="w-3.5 h-3.5 mr-1" /> Keranjang
         </button>
      </div>
    </motion.div>
  );
}
