import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
    images: {
        domains: ['amazon-clone-image-bucket.s3.amazonaws.com'],
    },
};

export default nextConfig;
