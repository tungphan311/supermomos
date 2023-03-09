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
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "https://api.supermomos-dev.com/interview/:path*",
    },
  ],
  redirects: async () => [
    {
      source: "/",
      destination: "/socials/create-new",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
