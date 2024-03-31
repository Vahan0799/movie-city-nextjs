import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import SliderList from '@/components/slider-list';
import {dispatch} from '@/helpers';
import {useCurrentLocale} from '@/hooks/useLocale';
import useDebounce from '@/hooks/useDebounce';
import {getTrendingTv, getTrendingMovie} from '@/services/home';
import {setTrending} from '@/redux/slices/homeSlice';
import styles from './index.module.scss';

const Index = ({contentType}) => {
	const [trendingBy, setTrendingBy] = useState('day');
	const locale = useCurrentLocale();
	const {trending} = useSelector(state => state.home);

	const {t} = useTranslation();

	useEffect(() => {
		const fetchData = async () => {
			const response = contentType === 'tv' ?
				await getTrendingTv(locale, trendingBy) :
				await getTrendingMovie(locale, trendingBy);

			dispatch(setTrending({
				[contentType]: response
			}));
		};

		fetchData();
	}, [contentType, trendingBy, locale]);

	const trendingLabels = [
		{
			type: 'day',
			title: 'today'
		},
		{
			type: 'week',
			title: 'week'
		}
	];

	const handleTrendingChange = useDebounce(type => {
		setTrendingBy(type);
	}, 500);

	return (
		<section className={styles.trendingWrapper}>
			<div className={styles.trendingFilter}>
				{trendingLabels.map(trending =>
					<div key={trending.type}
						 className={trendingBy === trending.type ? styles.trendingActive : ''}
					>
						<input
							type="radio"
							id={`trending-${contentType}-${trending.title}`}
							className="hidden"
							onChange={() => handleTrendingChange(trending.type)}
							checked={trendingBy === trending.type}
						/>
						<label htmlFor={`trending-${contentType}-${trending.title}`}>
							<span className="gradient-text">{t(trending.title)}</span>
						</label>
					</div>
				)}
			</div>
			<SliderList
				listType={`trending-${contentType}`}
				title={contentType === 'tv' ? 'trendingShows' : 'trendingMovies'}
				items={trending[contentType]}
				mediaType={contentType}
			/>
		</section>
	)
}

export default Index;
