'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ChevronRight,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  User,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { checkoutItems, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: 'jnt',
    paymentMethod: 'va'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if no items to checkout
  useEffect(() => {
    if (checkoutItems.length === 0) {
      router.push('/');
    }
  }, [checkoutItems, router]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';
    if (!formData.phone) newErrors.phone = 'Nomor HP wajib diisi';
    if (!formData.address) newErrors.address = 'Alamat lengkap wajib diisi';
    if (!formData.city) newErrors.city = 'Kota/Kecamatan wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = async () => {
    if (!validate()) return;
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (checkoutItems.length === 0 && !isSuccess) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#fff5f2] w-24 h-24 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-[#f53d2d]" />
        </motion.div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Pesanan Berhasil Dibuat!</h1>
        <p className="text-slate-500 mb-8 max-w-sm">
          Terima kasih telah berbelanja di Attalwin Official. Nomor pesanan Anda adalah <span className="font-bold text-slate-800">#ATL-882910</span>. 
          Instruksi pembayaran telah dikirim ke email Anda.
        </p>
        <Link 
          href="/" 
          className="bg-[#f53d2d] text-white px-8 py-3 rounded-sm font-bold shadow-lg shadow-[#f53d2d]/20 hover:bg-[#d73211] transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = formData.shippingMethod === 'jnt' ? 0 : 15000;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24 md:pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center text-slate-600 hover:text-[#f53d2d] transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="font-medium">Kembali</span>
          </button>
          <div className="text-lg font-bold text-slate-900 absolute left-1/2 -translate-x-1/2">Checkout</div>
          <div className="flex items-center text-[#f53d2d] font-bold text-xs">
            <ShieldCheck className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Pembayaran Aman</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Customer Info */}
          <section className="bg-white p-6 rounded-sm shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#fff5f2] flex items-center justify-center">
                <User className="w-4 h-4 text-[#f53d2d]" />
              </div>
              <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Informasi Pembeli</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Contoh: Budi Santoso"
                      className={cn(
                        "w-full bg-slate-50 border rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-[#f53d2d] transition-all",
                        errors.name ? "border-red-500" : "border-slate-200"
                      )}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nomor HP</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      placeholder="0812xxxx"
                      className={cn(
                        "w-full bg-slate-50 border rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-[#f53d2d] transition-all",
                        errors.phone ? "border-red-500" : "border-slate-200"
                      )}
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input 
                  type="email" 
                  placeholder="budi@email.com"
                  className={cn(
                    "w-full bg-slate-50 border rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-[#f53d2d] transition-all",
                    errors.email ? "border-red-500" : "border-slate-200"
                  )}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="bg-white p-6 rounded-sm shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#fff5f2] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#f53d2d]" />
              </div>
              <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Alamat Pengiriman</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                <textarea 
                  rows={3}
                  placeholder="Nama jalan, Nomor rumah, No. RT/RW"
                  className={cn(
                    "w-full bg-slate-50 border rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-[#f53d2d] transition-all resize-none",
                    errors.address ? "border-red-500" : "border-slate-200"
                  )}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                {errors.address && <p className="text-[10px] text-red-500 mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Kota / Kecamatan</label>
                  <input 
                    type="text" 
                    placeholder="Jakarta Pusat"
                    className={cn(
                      "w-full bg-slate-50 border rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-[#f53d2d] transition-all",
                      errors.city ? "border-red-500" : "border-slate-200"
                    )}
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Kode Pos</label>
                  <input 
                    type="text" 
                    placeholder="10110"
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm py-2.5 px-3 text-sm focus:outline-none focus:border-[#f53d2d] transition-all"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Shipping & Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {/* Shipping Method */}
             <section className="bg-white p-6 rounded-sm shadow-sm border border-slate-100 flex-1">
                <div className="flex items-center space-x-3 mb-6">
                  <Truck className="w-5 h-5 text-[#f53d2d]" />
                  <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Pengiriman</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'jnt', name: 'J&T Express (Gratis)', desc: 'Estimasi 3-4 hari' },
                    { id: 'sicepat', name: 'SiCepat REG (Rp15rb)', desc: 'Estimasi 1-2 hari' }
                  ].map(method => (
                    <label key={method.id} className={cn(
                      "flex items-center p-3 border rounded-sm cursor-pointer transition-all",
                      formData.shippingMethod === method.id ? "bg-[#fff5f2] border-[#f53d2d]" : "bg-white border-slate-100 hover:border-slate-300"
                    )}>
                      <input 
                        type="radio" 
                        name="shipping" 
                        className="hidden" 
                        checked={formData.shippingMethod === method.id}
                        onChange={() => setFormData({...formData, shippingMethod: method.id})}
                      />
                      <div className="flex flex-col">
                        <span className={cn("text-xs font-bold", formData.shippingMethod === method.id ? "text-[#f53d2d]" : "text-slate-700")}>{method.name}</span>
                        <span className="text-[10px] text-slate-400">{method.desc}</span>
                      </div>
                      {formData.shippingMethod === method.id && <CheckCircle2 className="w-4 h-4 text-[#f53d2d] ml-auto" />}
                    </label>
                  ))}
                </div>
             </section>

             {/* Payment Method */}
             <section className="bg-white p-6 rounded-sm shadow-sm border border-slate-100 flex-1">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-5 h-5 text-[#f53d2d]" />
                  <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Pembayaran</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'va', name: 'Virtual Account' },
                    { id: 'cod', name: 'Bayar di Tempat (COD)' },
                    { id: 'gopay', name: 'GoPay / ShopeePay' }
                  ].map(method => (
                    <label key={method.id} className={cn(
                      "flex items-center p-3 border rounded-sm cursor-pointer transition-all",
                      formData.paymentMethod === method.id ? "bg-[#fff5f2] border-[#f53d2d]" : "bg-white border-slate-100 hover:border-slate-300"
                    )}>
                      <input 
                        type="radio" 
                        name="payment" 
                        className="hidden" 
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData({...formData, paymentMethod: method.id})}
                      />
                      <span className={cn("text-xs font-bold", formData.paymentMethod === method.id ? "text-[#f53d2d]" : "text-slate-700")}>{method.name}</span>
                      {formData.paymentMethod === method.id && <CheckCircle2 className="w-4 h-4 text-[#f53d2d] ml-auto" />}
                    </label>
                  ))}
                </div>
             </section>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
           <div className="bg-white rounded-sm shadow-sm border border-slate-100 divide-y divide-slate-50 sticky top-24">
              <div className="p-6">
                <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm mb-6">Ringkasan Pesanan</h2>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {checkoutItems.map((item, idx) => (
                    <div key={idx} className="flex space-x-4">
                      <div className="relative w-16 h-16 bg-slate-50 rounded-sm overflow-hidden flex-shrink-0">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Variasi: {item.color}, {item.size}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] text-slate-500">x{item.quantity}</span>
                          <span className="text-sm font-bold text-[#f53d2d]">Rp {item.price.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-800 font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Biaya Pengiriman</span>
                    <span className="text-green-600 font-medium">{shippingFee === 0 ? 'Gratis' : `Rp ${shippingFee.toLocaleString('id-ID')}`}</span>
                 </div>
                 <div className="flex justify-between items-end pt-3 border-t border-slate-100">
                    <span className="text-sm font-bold text-slate-800">Total Pembayaran</span>
                    <span className="text-2xl font-bold text-[#f53d2d]">Rp {total.toLocaleString('id-ID')}</span>
                 </div>
              </div>

              <div className="p-6">
                <button 
                  onClick={handleOrder}
                  disabled={isProcessing}
                  className={cn(
                    "w-full py-4 rounded-sm font-bold text-white transition-all flex items-center justify-center space-x-2 relative overflow-hidden shadow-lg",
                    isProcessing ? "bg-slate-400 cursor-not-allowed" : "bg-[#f53d2d] hover:bg-[#d73211] shadow-[#f53d2d]/20"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isProcessing ? (
                      <motion.div 
                        key="processing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        <span>Memproses...</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        <span>BUAT PESANAN SEKARANG</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] text-slate-400">
                   <ShieldCheck className="w-3 h-3" />
                   <span>Jaminan Keamanan Attalwin Official</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
