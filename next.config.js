/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Reduce HMR noise in console
      config.infrastructureLogging = {
        level: "error",
      };
    }
    return config;
  },
};

module.exports = nextConfig;
