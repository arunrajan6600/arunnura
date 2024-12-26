/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**' // Allows all hostnames for HTTPS
            },
            {
                protocol: 'http',
                hostname: '**' // Allows all hostnames for HTTP
            }
        ]
    }
};

module.exports = nextConfig;
