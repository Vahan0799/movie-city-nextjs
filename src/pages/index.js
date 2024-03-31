import React from 'react';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import MoviesPaginate from '@/components/pages/home/movies-paginate';
import Trending from '@/components/pages/home/trending';

const Home = () => {
    const {t} = useTranslation();

    return (
        <Default
            title="Movie City"
            description={t('pageMetas.homeDescription')}
            staticImage="/movie-city.svg"
        >
            <MoviesPaginate/>
            <Trending contentType="tv"/>
            <Trending contentType="movies"/>
        </Default>
    )
}

export default Home;

export const getStaticProps = async ({ locale }) => {
    const translations = await serverSideTranslations(locale, ['common', 'homePage']);

    return {
        props: {
            ...translations
        },
    };
};
