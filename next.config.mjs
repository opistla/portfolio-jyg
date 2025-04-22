/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
  images: {
    domains: ['placehold.co', 'via.placeholder.com', 'placekitten.com', 'picsum.photos'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
};

export default nextConfig;
