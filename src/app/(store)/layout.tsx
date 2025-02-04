import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ClerkProvider } from "@clerk/nextjs";
import WishlistProvider from "@/context/WishListContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],  
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comforty-E-commerce-App",
  description: "Generated by Areeba Awan",
  keywords: "comfort, furniture, home decor, online store",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: 'website',
    url: 'https://hackathon-3-e-commerce-app.vercel.app/',
    title: 'Comforty-E-Commerce-App',
    description: 'Generated by Areeba Awan',
    images: [
      {
        url: 'https://hackathon-3-e-commerce-app.vercel.app/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Comforty',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClerkProvider>
          <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto">{children}
            <ToastContainer />
            </main>

            </WishlistProvider>
          </CartProvider>

          <Footer />
          </ClerkProvider>
        </body>
      </html>

  );
}
