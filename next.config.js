// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['upload.wikimedia.org'],
//   },
// };

// module.exports = nextConfig;
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ih1.redbubble.net',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;


