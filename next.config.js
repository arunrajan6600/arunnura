
module.exports = {
  output: 'export',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',  // Allows all hostnames for HTTPS
          },
          {
            protocol: 'http',
            hostname: '**',  // Allows all hostnames for HTTP
          },
        ],
      },
}