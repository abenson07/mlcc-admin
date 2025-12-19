import type { NextConfig } from "next";

// Only use basePath in production (for Webflow Cloud deployment)
// In development, serve from root for simplicity
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/admin' : '';

const nextConfig: NextConfig = {
  ...(basePath && {
    basePath,
    assetPrefix: basePath,
  }),
  
  reactStrictMode: true,
};

export default nextConfig;

