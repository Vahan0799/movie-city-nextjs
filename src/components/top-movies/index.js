import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import MediaCardLabel from '@/components/media-card-label';
import Button from '@/components/UI/Button';
import {dispatch, getRandomInt} from '@/helpers';
import {useCurrentLocale, usePreviousLocale} from '@/hooks/useLocale';
import useDebounce from '@/hooks/useDebounce';
import {getTopMovies} from '@/services/global';
import {setTopMovies} from '@/redux/slices/persistSlice';

const Index = () => {
	const [update, setUpdate] = useState(false);

	const {topMovies} = useSelector(state => state.persist);
	const locale = useCurrentLocale();
	const prevLocale = usePreviousLocale(locale);

	useEffect(() => {
		if (topMovies.data.length === 0 || (update || prevLocale !== locale)) {
			getTopMovies(locale, topMovies.page)
				.then((response) => {
					dispatch(setTopMovies({ ...topMovies, data: response }));
				});
		}
	}, [locale, topMovies.page, update]);

	const {t} = useTranslation();

	const updateTopMovies = useDebounce(() => {
		setUpdate(true);

		dispatch(setTopMovies({
			...topMovies,
			page: getRandomInt(1, 200)
		}))
	}, 1000);

	return (
		<section className="top-movies-wrapper lg:sticky lg:top-[100px] lg:transition-[top] lg:duration-300">
			<div className="flex items-center justify-between mb-5">
				<h3 className="mb-0">{t('topMovies')}</h3>
				<Button onClick={updateTopMovies}>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M4.10547 7.91406C4.40625 7.0625 4.89453 6.26172 5.58203 5.57813C8.02344 3.13672 11.9805 3.13672 14.4219 5.57813L15.0898 6.25H13.125C12.4336 6.25 11.875 6.80859 11.875 7.5C11.875 8.19141 12.4336 8.75 13.125 8.75H18.1055H18.1211C18.8125 8.75 19.3711 8.19141 19.3711 7.5V2.5C19.3711 1.80859 18.8125 1.25 18.1211 1.25C17.4297 1.25 16.8711 1.80859 16.8711 2.5V4.5L16.1875 3.8125C12.7695 0.394531 7.23047 0.394531 3.8125 3.8125C2.85937 4.76562 2.17187 5.88672 1.75 7.08594C1.51953 7.73828 1.86328 8.44922 2.51172 8.67969C3.16016 8.91016 3.875 8.56641 4.10547 7.91797V7.91406ZM1.52344 11.3008C1.32812 11.3594 1.14062 11.4648 0.988281 11.6211C0.832031 11.7773 0.726563 11.9648 0.671875 12.168C0.660156 12.2148 0.648437 12.2656 0.640625 12.3164C0.628906 12.3828 0.625 12.4492 0.625 12.5156V17.5C0.625 18.1914 1.18359 18.75 1.875 18.75C2.56641 18.75 3.125 18.1914 3.125 17.5V15.5039L3.8125 16.1875C7.23047 19.6016 12.7695 19.6016 16.1836 16.1875C17.1367 15.2344 17.8281 14.1133 18.25 12.918C18.4805 12.2656 18.1367 11.5547 17.4883 11.3242C16.8398 11.0937 16.125 11.4375 15.8945 12.0859C15.5937 12.9375 15.1055 13.7383 14.418 14.4219C11.9766 16.8633 8.01953 16.8633 5.57813 14.4219L5.57422 14.418L4.90625 13.75H6.875C7.56641 13.75 8.125 13.1914 8.125 12.5C8.125 11.8086 7.56641 11.25 6.875 11.25H1.89063C1.82813 11.25 1.76562 11.2539 1.70312 11.2617C1.64062 11.2695 1.58203 11.2812 1.52344 11.3008Z"
							fill="rgb(var(--color-primary-blue))"/>
					</svg>
				</Button>
			</div>
			{topMovies.data.map((item, key) => <MediaCardLabel key={key} delay={key} media={item}/>)}
		</section>
	)
};

export default Index;
