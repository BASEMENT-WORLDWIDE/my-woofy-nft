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
    },
    async redirects() {
        return [
            {
                source: '/woofys',
                destination: '/explore',
                permanent: false,
            }
        ]
    }
}

module.exports = nextConfig
