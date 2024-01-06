import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import MediaCardLabel from '@/components/media-card-label';
import Button from '@/components/UI/Button';
import UpdateIcon from '@/components/svg/update-icon';
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
				<Button onClick={updateTopMovies}><UpdateIcon/></Button>
			</div>
			{topMovies.data.map((item, key) => <MediaCardLabel key={key} delay={key} media={item}/>)}
		</section>
	)
};

export default Index;
