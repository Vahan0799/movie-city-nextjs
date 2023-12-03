import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import Empty from '@/layouts/Empty';
import Cast from '@/components/pages/cast';
import MovieLabel from '@/components/pages/cast/media-label';
import {fetchCastData} from '@/services/media/movie/cast';

const CastPage = ({ cast, crew, movieData }) => {

	const {t} = useTranslation();

	return (
		<Empty
			title={`${movieData.title} - ${t('pageMetas.castTitle')}`}
			description={`${movieData.title} - ${t('pageMetas.castTitle')}`}
			image={movieData.backdrop_path}
			backgroundPoster={movieData.backdrop_path}
			className="transparent-bg"
		>
			<MovieLabel media={movieData}/>
			<Cast
				castData={cast}
				crewData={crew}
			/>
		</Empty>
	)
}

export default CastPage;

export const getServerSideProps = async ({ locale, query }) => {
	try {
		const currentLocale = locale || 'en';
		const { id } = query;

		const { cast, crew, movieData } = id
			? await fetchCastData(id, currentLocale)
			: { cast: [], crew: [], movieData: {} };

		return {
			props: {
				...(await serverSideTranslations(currentLocale)),
				cast,
				crew,
				movieData,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				...(await serverSideTranslations(locale)),
				cast: [],
				crew: [],
				movieData: {},
			},
		};
	}
};
