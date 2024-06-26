import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import Media from '@/components/pages/media';
import FullMovie from '@/components/pages/media/full-media';
const ClipCard = dynamic(import('@/components/pages/media/clip-list'), {ssr: false});
import SliderList from '@/components/slider-list';
import Reviews from '@/components/pages/media/reviews';
import Loader from '@/components/loader';
import {fetchMovieData} from '@/services/media/movie';

const Index = ({ movie }) => {
    const [unmounted, setUnmounted] = useState(false);

    useEffect(() => {
        return () => {
            setUnmounted(true);
        };
    }, []);

    if (unmounted) return null;

    if (!movie.info) return <Loader/>;

    const movieWithDefaultClip = {
        ...movie,
        clip: movie.clip || null,
    };

    const { info, clip, cast, recommendations, similar, reviews, imdbId, clipList } = movieWithDefaultClip;

    return (
        <Default
            title={`Movie City | ${info.title}`}
            description={info.overview}
            image={info.backdrop_path}
            backgroundPoster={info.backdrop_path}
        >
            <Media data={info} clipKey={clip ? clip.key : null}/>
            <FullMovie mediaTitle={info.title} mediaId={imdbId.imdb_id}/>
            {clipList && <ClipCard items={clipList}/>}
            <SliderList
                listType="cast-members"
                sliderType="cast"
                title="cast.cast"
                emptyMessage="media.missingCast"
                mediaId={info.id}
                mediaTitle={info.title}
                items={cast}
            />
            <SliderList
                listType="recommended"
                title="media.recommendedMovies"
                emptyMessage="media.missingRecommendations"
                items={recommendations}
                mediaTitle={info.title}
            />
            <SliderList
                listType="similars"
                title="media.similarMovies"
                emptyMessage="media.missingSimilars"
                items={similar}
                mediaTitle={info.title}
            />
            <Reviews movieTitle={info.title} reviews={reviews} />
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

    const movie = await fetchMovieData(queryId, locale);

    return {
        props: {
            title: movie.info.title,
            description: movie.info.overview,
            image: movie.info.poster_path,
            movie,
            ...(await serverSideTranslations(locale)),
        },
    };
};
