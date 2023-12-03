/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'static.cozyverse.xyz',
                pathname: '/woofys/images/*',
                protocol: 'https'
            }
        ]
    }
}

module.exports = nextConfig
