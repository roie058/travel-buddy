/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    BACKEND_URL: process.env.BACKEND_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    WEATHER_KEY: process.env.WEATHER_URL,
    MAPS_API_KEY: process.env.MAPS_API_KEY,
    GOOGLE_MAPS_LIBERIES: process.env.GOOGLE_MAPS_LIBERIES,
    RAPID_KEY: process.env.RAPID_KEY,
  },
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
