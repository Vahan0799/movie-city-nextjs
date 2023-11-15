import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Empty from '@/layouts/Empty';
import MovieList from '@/components/pages/genre/movie-list';
import Pagination from '@/components/pagination';
import {dispatch, filterFetchResults} from '@/helpers';
import {capitalizeFirstLetter} from '@/helpers/stringHelpers';
import {setMovieGenreResults} from '@/redux/slices/genreSlice';
import {getMovieGenreResults} from '@/services/genre';

const Index = () => {
    const router = useRouter();
    const id = router.query.id;
    const locale = router.locale;
    const {movieGenreResults, movieGenreList} = useSelector(state => state.genre);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [genreItem, setGenreItem] = useState({});

    const {t} = useTranslation();

    useEffect(() => {
        if (id) {
            getMovieGenreResults(locale, id, currentPage)
                .then(response => {
                    const filteredResults = response.results.filter(item => filterFetchResults(item))
                    const sortedResponse = filteredResults.sort((a, b) => b.vote_average - a.vote_average)
                    dispatch(setMovieGenreResults(sortedResponse))
                    setTotalPages(response.total_pages)
                });

            return () => dispatch(setMovieGenreResults([]));
        }
    }, [id, locale, currentPage]);

    useEffect(() => {
        setTotalPages(1);
    }, [id])

    useEffect(() => {
        const updatedGenreItem = movieGenreList.find(item => item.id === Number(id));
        setGenreItem(updatedGenreItem);
    }, [movieGenreList, id, locale]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Empty
            title={`Movie City - ${t('global.genre')} - ${genreItem && capitalizeFirstLetter(genreItem.name)}`}
            description={`Movie City - ${t('global.genre')} - ${router.query.name}`}
        >
            <div className="genre-results">
                <h1 className="text-right p-3 w-fit ml-auto">
                    {t('global.genre')}:&nbsp;
                    <span className="gradient-text">
                        {genreItem && capitalizeFirstLetter(genreItem.name)}
                    </span>
                </h1>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <MovieList results={movieGenreResults}/>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </Empty>
    )
}

export default Index;

export const getServerSideProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
};
