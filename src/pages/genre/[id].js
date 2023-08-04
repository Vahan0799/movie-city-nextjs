import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import MovieList from '@/components/pages/genre/movie-list';
import {getGenreResults} from '@/services/genre';
import {dispatch} from '@/helpers';
import {useSelector} from 'react-redux';
import {setGenreResults} from '@/redux/slices/genreSlice';
import Pagination from '@/components/pagination';

const Index = () => {
    const router = useRouter();
    const id = router.query.id;
    const locale = router.locale;
    const {genreResults} = useSelector(state => state.genre);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setTotalPages(1);
    }, [id])

    useEffect(() => {
        if (id) {
            getGenreResults(locale, id, currentPage)
                .then(res => {
                    dispatch(setGenreResults(res.results))
                    setTotalPages(res.total_pages)
                });

            return () => {
                dispatch(setGenreResults([]))
            }
        }
    }, [id, locale, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Default
            secondary
        >
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <MovieList results={genreResults}/>
        </Default>
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