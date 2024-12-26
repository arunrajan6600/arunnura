/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: 'https://arunrajan6600.github.io/arunnura/',
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
