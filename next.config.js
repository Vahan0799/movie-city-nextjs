/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    i18n: {
        locales: i18n.locales,
        defaultLocale: i18n.defaultLocale,
        localeDetection: true,
    },

    env: {
        APP_URL: process.env.APP_URL,
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        API_TOKEN: process.env.API_TOKEN,
        IMAGE_PATH: process.env.IMAGE_PATH,
        BACKDROP_PATH: process.env.BACKDROP_PATH,
        MEDIA_API: process.env.MEDIA_API
    },

    images: {
        domains: ['image.tmdb.org', 'img.youtube.com'],
        dangerouslyAllowSVG: true
    },

    async redirects() {
        const routes = ['media', 'media/tv', 'media/movie', 'search', 'genre', 'genre/movie-list', 'genre/tv-list', 'person'];

        const redirects = routes.map((redirect) => {
            return {
                source: `/${redirect}`,
                destination: '/',
                permanent: true,
            }
        })

        return redirects;
    }
}

module.exports = nextConfig
