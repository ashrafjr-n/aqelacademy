import type { NextConfig } from "next";

const canonicalHost = "aqelacademy.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // www.aqelacademy.com/* → aqelacademy.com/*
        source: "/:path*",
        has: [{ type: "host", value: `www.${canonicalHost}` }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
