/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: false,
  i18n,
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
    RESEND_KEY: process.env.RESEND_KEY,
    EMAIL_COMPANY: process.env.EMAIL_COMPANY,
    KIWI_KEY: process.env.KIWI_KEY,
    OPENAI_KEY: process.env.OPENAI_KEY,
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
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.kiwi.com",
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
      "flagcdn.com",
      "source.unsplash.com",
      "images.kiwi.com",
    ],
  },
};
module.exports = withBundleAnalyzer(nextConfig);
