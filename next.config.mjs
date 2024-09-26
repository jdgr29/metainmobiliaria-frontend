/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_URL: "/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
