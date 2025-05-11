import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows ESLint errors to be ignored during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
