/** @type {import('next').NextConfig} */
import { withPlausibleProxy } from "next-plausible";

const nextConfig = withPlausibleProxy()({
  staticPageGenerationTimeout: 120,
});

export default nextConfig;
