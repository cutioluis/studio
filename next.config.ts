
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      { // Added for OG/Twitter images if they are hosted externally
        protocol: 'http', // Or 'https' if your site is served over HTTPS
        hostname: 'localhost', // Or your actual domain in production
        port: '9002', // Or your actual port
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Add your production domain here as well if NEXT_PUBLIC_SITE_URL is different
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'your-production-domain.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : 'http://localhost:9002',
  }
};

export default nextConfig;
