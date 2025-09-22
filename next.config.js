const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SITE_URL: process.env.SITE_URL,
    NEXT_EXTERNAL_API_BASE_URL: process.env.NEXT_EXTERNAL_API_BASE_URL,
    NEXT_INTERNAL_API_BASE_URL: process.env.NEXT_INTERNAL_API_BASE_URL,
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
