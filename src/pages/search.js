import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import {getSearchResults} from '@/services/global';
import {setSearchPageResults} from '@/redux/slices/globalSlice';
import {dispatch, filterFetchResults} from '@/helpers';
import MediaCard from '@/components/media-card';
import Pagination from '@/components/pagination';

const Index = () => {
	const router = useRouter();
	const [isEmpty, setEmpty] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const {searchPageResults} = useSelector(state => state.global);
	const keyword = router.query;
	const locale = router.locale;

	const {t} = useTranslation();

	useEffect(() => {
		if (keyword) {
			getSearchResults(keyword.query, locale, currentPage)
				.then(response => {
					const filtered = response.results.filter((item) => filterFetchResults(item));
					const sortedByPopularity = filtered.sort((a, b) => b.vote_average - a.vote_average)
					dispatch(setSearchPageResults(sortedByPopularity))
					setEmpty(response.results.length === 0)
					setTotalPages(response.total_pages)
				})

			return () => dispatch(setSearchPageResults([]));
		}
	},[keyword, locale, currentPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<Default>
			<section className={`min-h-[70vh] min-h-[70dvh] grid${!isEmpty ? ' grid-cols-2 lg:grid-cols-3' : ''}`}>
				{searchPageResults.map(((media, key) =>
					<MediaCard
						detailed
						mediaType={media.media_type}
						media={media}
						delay={key}
						key={media.id}
					/>
				))}
				{isEmpty &&
					<h1 className="text-center text-secondary-blue font-bold mt-4">
						{t('noResults')}
					</h1>
				}
			</section>
			{!isEmpty &&
				<Pagination
					totalPages={totalPages}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			}
		</Default>
	)
}

export default Index;

export const getServerSideProps = async ({locale}) => {
    const translated = locale === 'ru' ? 'Результаты поиска' : 'Search Results for';

    return {
        props: {
            title: `Movie City`,
            description: `Movie City - ${translated}`,
            staticImage: '/movie-city.svg',
            ...(await serverSideTranslations(locale))
        }
    }
};
