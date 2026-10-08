/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "wrzzrfidyrkbsktkqrly.supabase.co",
      },
    ],
  },
};

export default nextConfig;