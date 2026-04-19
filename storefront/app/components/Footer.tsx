'use client';

import Link from 'next/link';
import { cn } from '../lib/utils';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h2 className="text-2xl font-serif italic font-bold tracking-tight text-[#f53d2d]">Attalwin</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Membangun karakter melalui busana. Attalwin menghadirkan koleksi busana muslim pria dengan kualitas premium dan desain eksklusif.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#f53d2d] hover:text-white transition-all">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#f53d2d] hover:text-white transition-all">
                <i className="fa-brands fa-tiktok text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#f53d2d] hover:text-white transition-all">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs mb-6">Layanan Pelanggan</h3>
            <ul className="space-y-4 text-sm text-slate-500">
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Bantuan</Link></li>
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Metode Pengiriman</Link></li>
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Lacak Pesanan</Link></li>
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Kebijakan Pengembalian</Link></li>
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs mb-6">Tentang Attalwin</h3>
            <ul className="space-y-4 text-sm text-slate-500">
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Tentang Kami</Link></li>
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Katalog Produk</Link></li>
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Blog Fashion</Link></li>
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Peluang Reseller</Link></li>
               <li><Link href="/" className="hover:text-[#f53d2d] transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs mb-6">Metode Pembayaran</h3>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">Kami mendukung berbagai metode pembayaran yang aman.</p>
            <div className="grid grid-cols-4 gap-4 opacity-70 justify-items-center">
                {[
                  { name: "BCA", icon: "fa-building-columns" },
                  { name: "Mandiri", icon: "fa-building-columns" },
                  { name: "BNI", icon: "fa-building-columns" },
                  { name: "BRI", icon: "fa-building-columns" },
                  { name: "QRIS", icon: "fa-qrcode" },
                  { name: "Wallet", icon: "fa-wallet" },
                  { name: "Store", icon: "fa-store" }
                ].map((pay, i) => (
                  <div key={i} className="flex flex-col items-center group cursor-pointer">
                    <div className="w-10 h-10 bg-slate-50 rounded-sm flex items-center justify-center group-hover:bg-[#fff5f2] transition-colors">
                      <i className={`fa-solid ${pay.icon} text-sm text-slate-400 group-hover:text-[#f53d2d]`}></i>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">© 2026 Attalwin Official Store. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
             <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</Link>
             <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</Link>
             <div className="flex items-center space-x-1 text-xs text-slate-400">
                <i className="fa-solid fa-earth-asia text-[10px]"></i>
                <span>Indonesia (Bahasa)</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
