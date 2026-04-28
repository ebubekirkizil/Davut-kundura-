import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Vercel build asamasinda ESLint hatalarini gormezden gel.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Vercel build asamasinda TypeScript (Tip) hatalarini gormezden gel.
    ignoreBuildErrors: true,
  },
  images: {
    // Resimlerin gosteriminde dis baglantilara acik ol (hata vermesin)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" }
    ],
  }
};

export default nextConfig;
