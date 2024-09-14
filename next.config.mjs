/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "intent-donkey-722.convex.cloud",
            }
        ]
    }
};

export default nextConfig;
