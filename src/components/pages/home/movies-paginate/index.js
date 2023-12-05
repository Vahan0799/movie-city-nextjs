import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Pagination from '@/components/pagination';
import MediaCard from '@/components/media-card';
import Skeleton from '@/components/media-card/skeleton';
import {dispatch} from '@/helpers';
import {useCurrentLocale} from '@/hooks/useLocale';
import {setPaginatedList} from '@/redux/slices/homeSlice';
import {getMoviePaginations} from '@/services/home';
import styles from './index.module.scss';

const Index = () => {
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {paginatedList} = useSelector(state => state.home);

    const locale = useCurrentLocale();

    useEffect(() => {
        setLoading(true);
        dispatch(setPaginatedList([]));

        getMoviePaginations(locale, currentPage)
            .then((response) => {
                const sortedResults = response.results.sort((a, b) => b.vote_average - a.vote_average);
                dispatch(setPaginatedList(sortedResults));
                setTotalPages(response.total_pages);
                setLoading(false);
            });
    }, [locale, currentPage]);

    const handlePageChange = page => setCurrentPage(page);

    return (
        <section className={styles.moviesPaginate}>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <div className="grid my-5 grid-cols-2 md:grid-cols-3">
                <>
                    {isLoading
                        ? Array.from({length: 20}).map((_, index) => {
                            return <Skeleton key={`skeleton-paginate-${index}`}/>
                        })
                        : paginatedList.map((movie, index) => {
                            return <MediaCard detailed media={movie} delay={index} key={movie.id}/>
                        })
                    }
                </>
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </section>
    )
}

export default Index;
