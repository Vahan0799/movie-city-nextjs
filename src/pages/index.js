import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import MoviesPaginate from '@/components/pages/home/movies-paginate';
import Trending from '@/components/pages/home/trending';

const Home = () => {
    return (
        <Default>
            <MoviesPaginate/>
            <Trending contentType="tv"/>
            <Trending contentType="movies"/>
        </Default>
    )
}

export default Home;

export const getStaticProps = async ({ locale }) => {
    const translations = await serverSideTranslations(locale, ['common', 'homePage']);
    const description = locale === 'ru' ? 'Присоединяйтесь к нам и зовите друзей, чтобы вместе с MovieCity смотреть фильмы онлайн бесплатно в HD!'
        : 'Join us and invite your friends to watch movies online for free in HD with MovieCity!'

    return {
        props: {
            title: 'Movie City',
            description,
            staticImage: '/movie-city.svg',
            ...translations
        },
    };
};
