import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: fileURLToPath(new URL("../..", import.meta.url)),
  },
  transpilePackages: ["@zeron-ui/ui"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
