import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: "italic" });

export const metadata: Metadata = {
  title: "Attalwin Official | Busana Muslim Pria Premium & Eksklusif",
  description: "Temukan koleksi busana muslim pria terbaik dari Attalwin. Gamis, Jubah, dan Koko premium dengan desain modern, bahan berkualitas hi-end, dan kenyamanan maksimal untuk ibadah Anda.",
  keywords: "Attalwin, Busana Muslim Pria, Gamis Pria, Jubah Pria, Koko Premium, Fashion Muslim, Baju Umroh, Baju Haji",
  openGraph: {
    title: "Attalwin Official - Pilihan Utama Busana Muslim Pria",
    description: "Koleksi eksklusif Gamis dan Jubah Pria dengan kualitas Mall.",
    url: "https://attalwin.id",
    siteName: "Attalwin Store",
    images: [
      {
        url: "https://down-aka-id.img.susercontent.com/id-11134216-7rash-m5xh9d7ytndk19_tn.webp",
        width: 800,
        height: 800,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} font-sans antialiased text-slate-900`}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
