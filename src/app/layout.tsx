import type { Metadata } from "next";
import { Inter, Cinzel, Outfit, Great_Vibes } from "next/font/google";
import "./globals.css";
// Otonom sistem aktif: Vercel - GitHub entegrasyonu başarıyla sağlandı.
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Davut Kundura | Premium Deri İşçiliği ve Ortopedik Çözümler",
    template: "%s | Davut Kundura",
  },
  description: "Özel el işçiliği deri kemerler, ortopedik tabanlar, valiz yedek parçaları ve profesyonel ayakkabı bakım ürünlerinde sektör lideri kalite.",
  keywords: ["ortopedik taban", "deri kemer", "ayakkabı bakım seti", "valiz tekerleği", "hakiki deri", "davut kundura", "premium deri", "el işçiliği"],
  authors: [{ name: "Davut Kundura" }],
  creator: "Davut Kundura",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://davutkundura.vercel.app",
    title: "Davut Kundura | Premium Deri İşçiliği",
    description: "Özel el işçiliği deri kemerler, ortopedik tabanlar ve profesyonel ayakkabı bakım ürünleri.",
    siteName: "Davut Kundura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davut Kundura",
    description: "El işçiliği deri kemerler ve ortopedik çözümler.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${cinzel.variable} ${outfit.variable} ${greatVibes.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-gray-900 bg-white">
        <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
