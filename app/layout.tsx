import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ScrollToTop from "../components/Helper/ScrollToTop";
import ContactPop from "@/components/ContactPop";
import { UIProvider } from "@/hooks/context/UIContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xamdev Portfolio",
  description: "Created by Samuel A.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
        <UIProvider>
          <Navbar />
          {children}
          <Footer />
          <ContactPop />
          <ScrollToTop />
        </UIProvider>
      </body>
    </html>
  );
}

