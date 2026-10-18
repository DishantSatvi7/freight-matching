/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable output standalone if containerized later
  output: process.env.NEXT_OUTPUT_STANDALONE ? 'standalone' : undefined,
};

module.exports = nextConfig;
