/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'image.aladin.co.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bookthumb-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.s3.**.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
