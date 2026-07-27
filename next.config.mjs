/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow verification builds to target a separate folder (NEXT_DIST_DIR)
  // so they never clobber the .next folder a running dev/start server uses.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
