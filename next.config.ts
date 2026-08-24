import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a verification build run in its own directory (NEXT_DIST_DIR=.next-verify)
  // without clobbering the .next that a running `next dev` owns.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
