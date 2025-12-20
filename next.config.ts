import type { NextConfig } from "next";

// Configure the base path and asset prefix to match the mount path in Webflow Cloud
// The mount path is /admin, so we set both basePath and assetPrefix to /admin
const nextConfig: NextConfig = {
  basePath: '/admin',
  assetPrefix: '/admin',
  reactStrictMode: true,
};

export default nextConfig;

