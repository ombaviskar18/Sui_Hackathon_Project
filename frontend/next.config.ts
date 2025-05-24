import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Disable development indicators
    // appDir: true, // Removed for Vercel compatibility
  },
  // Disable development mode indicators
  env: {
    NEXT_PUBLIC_DISABLE_ROUTE_INDICATOR: 'true'
  }
};

export default nextConfig;
