// Data shared across the storefront pages

export const BANNERS = [
  {
    id: 1,
    image: "/banner_attalwin_1.png",
    link: "/product/1",
    color: "from-slate-900/10"
  },
  {
    id: 2,
    image: "/banner_attalwin_2.png",
    link: "/product/2",
    color: "from-slate-900/10"
  }
];

export const CATEGORIES = [
  { name: "Semua Produk", image: "/product_1.png" },
  { name: "Gamis Setelan", image: "/product_gamis.png" },
  { name: "Jubah", image: "/product_abaya.png" },
  { name: "Gamis Pria", image: "/product_1.png" },
  { name: "Atasan", image: "/product_koko.png" },
  { name: "Pakaian Muslim Anak Laki-Laki", image: "/product_4.png" }
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Attalwin - Gamis Jubah Pria Setelan Kurtah Umroh Haji Tanpa Manset SD001",
    price: 218000,
    originalPrice: 225000,
    discount: "3%",
    rating: 4.9,
    soldCount: "907 Terjual/Bln",
    category: "Gamis Setelan",
    images: [
      "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m6rr6z97e9pj7b@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbk5-m6rr6z97fo9z4a@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m6rr6z9730xoce@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m6rr6z97e9pj7b@resize_w450_nl.webp"
    ],
    video: "https://down-bs-sg.vod.susercontent.com/api/v4/11110105/mms/id-11110105-6vdv7-miogk47pan0oa5.16004111773431906.mp4",
    isMall: true,
    promoXtra: true,
    colors: [
      { name: "Putih", image: "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m6rr6z97e9pj7b@resize_w100_nl.webp" },
      { name: "Abu Tua", image: "https://down-id.img.susercontent.com/file/id-11134207-7rbk5-m6rr6z97fo9z4a@resize_w100_nl.webp" },
      { name: "Khaki", image: "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m6rr6z9730xoce@resize_w100_nl.webp" },
      { name: "Hitam", image: "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w100_nl.webp" }
    ],
    sizes: ["6", "8", "10", "12", "14"]
  },
  {
    id: 2,
    name: "Attalwin - Gamis Jubah Pria Muslim Umroh Haji Polos Tanpa Manset",
    price: 208000,
    originalPrice: 215000,
    discount: "3%",
    rating: 4.9,
    soldCount: "198 Terjual/Bln",
    category: "Jubah",
    images: [
      "https://down-id.img.susercontent.com/file/id-11134207-7rbk5-m6rr6z97fo9z4a@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m6rr6z97e9pj7b@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w450_nl.webp"
    ],
    video: "https://down-bs-sg.vod.susercontent.com/api/v4/11110105/mms/id-11110105-6vdv7-miogk47pan0oa5.16004111773431906.mp4",
    isMall: true,
    promoXtra: true,
    colors: [
      { name: "Putih", image: "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m6rr6z97e9pj7b@resize_w100_nl.webp" },
      { name: "Hitam", image: "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w100_nl.webp" }
    ],
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: 3,
    name: "Attalwin - Koko Gamis Jubah Pria Setelan Kurtah Umroh Haji Tanpa Manset",
    price: 228000,
    originalPrice: 235000,
    discount: "3%",
    rating: 4.9,
    soldCount: "87 Terjual/Bln",
    category: "Gamis Pria",
    images: [
      "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m6rr6z9730xoce@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbk5-m6rr6z97fo9z4a@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w450_nl.webp"
    ],
    isMall: true,
    promoXtra: true,
    colors: [
      { name: "Khaki", image: "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m6rr6z9730xoce@resize_w100_nl.webp" },
      { name: "Hitam", image: "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w100_nl.webp" }
    ],
    video: "https://down-bs-sg.vod.susercontent.com/api/v4/11110105/mms/id-11110105-6vdv7-miogk47pan0oa5.16004111773431906.mp4",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Attalwin - Koko Gamis Jubah Pria Polykatun Halus Lembut",
    price: 328000,
    originalPrice: 335000,
    discount: "2%",
    rating: 5.0,
    soldCount: "80 Terjual/Bln",
    category: "Gamis Pria",
    images: [
      "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m6rr6z9730xoce@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbk5-m6rr6z97fo9z4a@resize_w450_nl.webp"
    ],
    isMall: true,
    promoXtra: true,
    colors: [
      { name: "Hitam", image: "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w100_nl.webp" }
    ],
    video: "https://down-bs-sg.vod.susercontent.com/api/v4/11110105/mms/id-11110105-6vdv7-miogk47pan0oa5.16004111773431906.mp4",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 5,
    name: "Attalwin - Gamis Jubah Pria Emboss polos Umroh Haji Tangan Pendek",
    price: 190500,
    originalPrice: 200000,
    discount: "4%",
    rating: 4.9,
    soldCount: "66 Terjual/Bln",
    category: "Gamis Pria",
    images: [
      "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m6rr6z97e9pj7b@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m6rr6z9730xoce@resize_w450_nl.webp",
      "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w450_nl.webp"
    ],
    isMall: true,
    promoXtra: true,
    colors: [
      { name: "Putih", image: "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m6rr6z97e9pj7b@resize_w100_nl.webp" },
      { name: "Khaki", image: "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m6rr6z9730xoce@resize_w100_nl.webp" },
      { name: "Hitam", image: "https://down-id.img.susercontent.com/file/id-11134207-8224s-mioboxh05q814c@resize_w100_nl.webp" }
    ],
    video: "https://down-bs-sg.vod.susercontent.com/api/v4/11110105/mms/id-11110105-6vdv7-miogk47pan0oa5.16004111773431906.mp4",
    sizes: ["L", "XL", "XXL"]
  }
];

export const REVIEWS = [
  {
    id: 1,
    user: "Budi Santoso",
    rating: 5,
    date: "2024-03-15 14:30",
    variant: "Hitam, XL",
    comment: "Bahan sangat adem dan nyaman dipakai. Ukurannya pas sesuai deskripsi. Pengiriman juga cepat banget, seller responsif. Mantap!",
    avatar: "https://i.pravatar.cc/150?u=budi",
    images: [
      "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m6rr6z97e9pj7b@resize_w100_nl.webp"
    ],
    likes: 12
  },
  {
    id: 2,
    user: "Anisa Rahma",
    rating: 5,
    date: "2024-03-12 09:15",
    variant: "Putih, L",
    comment: "Kualitas jahitan rapi sekali. Warnanya sesuai dengan foto. Tidak menerawang, cocok banget buat ibadah umroh nanti. Terima kasih Attalwin!",
    avatar: "https://i.pravatar.cc/150?u=anisa",
    likes: 8
  },
  {
    id: 3,
    user: "Rizky Fauzi",
    rating: 4,
    date: "2024-03-10 16:45",
    variant: "Abu Tua, M",
    comment: "Barang sampai dengan aman. Kualitas kain oke banget untuk harga segini. Cuma pengiriman di ekspedisinya agak lama sedikit, tapi produknya TOP.",
    avatar: "https://i.pravatar.cc/150?u=rizky",
    likes: 5
  },
  {
    id: 4,
    user: "Dewi Lestari",
    rating: 5,
    date: "2024-03-08 11:20",
    variant: "Khaki, L",
    comment: "Suka banget sama potongannya, slim tapi tetap sopan. Bahannya jatuh dan nggak gampang kusut. Rekomen banget buat yang cari baju koko/gamis premium.",
    avatar: "https://i.pravatar.cc/150?u=dewi",
    likes: 15
  }
];
