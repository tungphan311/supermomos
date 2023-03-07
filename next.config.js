/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supermomos-app-resources-us.s3.amazonaws.com",
        port: "",
        pathname: "/Images/SocialBanner/**",
      },
    ],
  },
};

module.exports = nextConfig;
