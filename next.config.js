/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.tripadvisor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.tacdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "daisycon.io",
        pathname: "/**",
      },
    ],
    domains: [
      "media-cdn.tripadvisor.com",
      "www.tripadvisor.com",
      "static.tacdn.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "daisycon.io",
    ],
  },
};

module.exports = nextConfig;
