import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // Mantienes esto
  },
  eslint: {
    ignoreDuringBuilds: true, // Mantienes esto
  },
  images: { // Mantienes esto
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Aquí añadimos la configuración experimental que necesitas
  experimental: {
    allowedDevOrigins: [
      "https://3000-firebase-studio-1747251924758.cluster-uf6urqn4lned4spwk4xorq6bpo.cloudworkstations.dev"
      // Si prefieres usar '*', puedes poner: ['*']
    ],
  },
};

export default nextConfig; // Solo UN export default al final