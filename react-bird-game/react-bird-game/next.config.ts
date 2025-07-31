import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Ensure assets are properly handled in static export
  assetPrefix: '',
  // Disable image optimization for static export
  experimental: {
    optimizePackageImports: []
  }
};

export default nextConfig;
