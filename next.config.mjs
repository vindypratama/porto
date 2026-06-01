/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * 'standalone' mode: Next.js akan menghasilkan folder .next/standalone
   * yang berisi hanya file yang diperlukan untuk production.
   * Ini memangkas ukuran Docker image secara drastis (~150MB vs ~1GB).
   */
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
