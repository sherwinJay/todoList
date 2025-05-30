import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.clerk.com" }],
  },
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
