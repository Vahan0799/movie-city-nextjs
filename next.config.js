/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    i18n: {
        locales: i18n.locales,
        defaultLocale: i18n.defaultLocale,
        localeDetection: true,
    },

    env: {
        BASE_URL: process.env.BASE_URL,
        API_KEY: process.env.API_KEY,
        IMAGE_PATH: process.env.IMAGE_PATH,
        BACKDROP_PATH: process.env.BACKDROP_PATH,
        FULL_MOVIE_URL: process.env.FULL_MOVIE_URL
    },

    images: {
        domains: ['image.tmdb.org'],
        dangerouslyAllowSVG: true
    },

    async redirects() {
        const routes = ['movie', 'search', 'genre', 'person'];

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
