import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import Empty from '@/layouts/Empty';
import Cast from '@/components/pages/cast';
import MediaLabel from '@/components/pages/cast/media-label';
import {fetchCastData} from '@/services/media/tv/cast';

const CastPage = ({ cast, crew, tvData }) => {

	const {t} = useTranslation();

	return (
		<Empty
			backgroundPoster={tvData.backdrop_path}
			className="transparent-bg"
		>
			<MediaLabel media={tvData} mediaType="tv"/>
			<Cast castData={cast} crewData={crew}/>
		</Empty>
	)
}

export default CastPage;

export const getServerSideProps = async ({ locale, query }) => {
	const translated = locale === 'ru' ? 'Актеры и съемочная группа' : 'Cast & Crew'

	try {
		const currentLocale = locale || 'en';
		const { id } = query;

		const { cast, crew, tvData } = id
			? await fetchCastData(id, currentLocale)
			: { cast: [], crew: [], tvData: {} };

		return {
			props: {
				title: `${tvData.name} ${translated}`,
				description: `${tvData.name} ${translated}`,
				image: tvData.backdrop_path,
				...(await serverSideTranslations(currentLocale)),
				cast,
				crew,
				tvData,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				...(await serverSideTranslations(locale)),
				cast: [],
				crew: [],
				tvData: {},
			},
		};
	}
};
