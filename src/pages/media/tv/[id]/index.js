import React, {useEffect, useState} from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import Media from '@/components/pages/media';
import FullMedia from '@/components/pages/media/full-media';
import SliderList from '@/components/slider-list';
import Reviews from '@/components/pages/media/reviews';
import Loader from '@/components/loader';
import {fetchTvData} from '@/services/media/tv';

const Index = ({ tv }) => {
    const [unmounted, setUnmounted] = useState(false);

    useEffect(() => {
        return () => setUnmounted(true);
    }, []);

    if (unmounted) return null;

    if (!tv.info) return <Loader/>;

    const { info, cast, recommendations, reviews, imdbId } = tv;

    return (
        <Default
            title={`Movie City | ${info.name}`}
            description={info.overview}
            image={info.backdrop_path}
            backgroundPoster={info.backdrop_path}
        >
            <Media data={info} type="tv" />
            <FullMedia mediaTitle={info.name} mediaId={imdbId.imdb_id}/>
            <SliderList
                listType="cast-members"
                sliderType="cast"
                title="cast.cast"
                emptyMessage="media.missingCast"
                mediaId={info.id}
                mediaTitle={info.name}
                mediaType="tv"
                items={cast}
            />
            <SliderList
                listType="recommended"
                title="media.recommendedMovies"
                emptyMessage="media.missingRecommendations"
                items={recommendations}
                mediaTitle={info.name}
                mediaType="tv"
            />
            <Reviews movieTitle={info.name} reviews={reviews} />
        </Default>
    );
};

export default Index;

export const getServerSideProps = async ({ locale, query }) => {
    const { id: queryId } = query;
    if (!queryId) {
        return {
            notFound: true,
        };
    }

    const tv = await fetchTvData(queryId, locale);

    return {
        props: {
            title: tv.info.name,
            description: tv.info.overview,
            image: tv.info.poster_path,
            tv,
            ...(await serverSideTranslations(locale)),
        },
    };
};
