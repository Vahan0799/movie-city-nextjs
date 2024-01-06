import React, {useEffect} from 'react';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';
import StarRatings from 'react-star-ratings/build/star-ratings';
import NextImage from '@/components/UI/next-image';
import NextLink from '@/components/UI/NextLink';
import Button from '@/components/UI/Button';
import {dispatch} from '@/helpers';
import {roundNumber, formatDate} from '@/helpers/stringHelpers';
import {setClipKey, setShowClip} from '@/redux/slices/movieSlice';
import PlayIcon from '@/assets/images/icons/play-btn.svg';
import styles from './index.module.scss';

const Index = props => {
	const {
		data = {},
		type = 'movie',
		clipKey
	} = props;

	const {t} = useTranslation();

	const toHoursAndMinutes = totalMinutes => {
		if (totalMinutes) {
			const hrs = Math.floor(totalMinutes / 60);
			const mins = totalMinutes % 60;

			let convertedHours = hrs <= 9 ? `0${hrs}` : hrs
			let convertedMinutes = mins <= 9 ? `0${mins}` : mins

			return `${convertedHours}:${convertedMinutes}`
		}
	};

	const formattedCurrency = value => {
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const showTrailer = () => {
		dispatch(setShowClip(true));
		clipKey && dispatch(setClipKey(clipKey));
	};

	useEffect(() => {
		clipKey && dispatch(setClipKey(clipKey));

		return () => dispatch(setClipKey(null));
	}, [data]);

	return (
		<section className={styles.mediaWrapper}>
			<div className={styles.mediaDetailsContainer}>
				<div className="flex flex-col gap-2.5">
					<NextImage
						src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
						alt={`Title: ${data.title || data.name}`}
						width={500}
						height={750}
						priority
					/>
					{type !== 'tv' &&
						<Button design="secondary" onClick={showTrailer} className="flex items-center gap-2">
							<span className="font-bold">{t('media.trailer')}</span>
							<NextImage
								wrapperClass="!w-[25px] !h-[25px] rounded-full overflow-hidden"
								src={PlayIcon} alt="play-icon" width={25} height={25}
							/>
						</Button>
					}
				</div>
				<ul className={styles.mediaDetails}>
					<li>{t('media.title')}: <span>{data.title || data.name}</span></li>
					<li>{t('media.originalTitle')}: <span>{data.original_title || data.original_name}</span></li>
					{type === 'tv' ? (
						<>
							{data.number_of_episodes && <li>{t('media.number_of_episodes')}: <span>{data.number_of_episodes}</span></li>}
							{data.number_of_seasons && <li>{t('media.number_of_seasons')}: <span>{data.number_of_seasons}</span></li>}
							{data.first_air_date && <li>{t('media.first_air_date')}: <span>{formatDate(data.first_air_date)}</span></li>}
							{data.last_air_date && <li>{t('media.last_air_date')}: <span>{formatDate(data.last_air_date)}</span></li>}
							{data.episode_run_time > 0 && <li>
								{t('media.duration')}:
								<span>{data.episode_run_time} {t('media.min')} / {toHoursAndMinutes(data.episode_run_time)}</span>
							</li>}
						</>
					) : (
						<>
							<li>{t('media.year')}: <span>{formatDate(data.release_date)}</span></li>
							{data.tagline && <li>{t('media.tagline')}: <span>{data.tagline}</span></li>}
							{data.budget > 0 && <li>{t('media.budget')}: <span>{formattedCurrency(data.budget)}</span></li>}
							{data.runtime > 0 &&
								<li>
									{t('media.duration')}:
									<span>{data.runtime} {t('media.min')} / {toHoursAndMinutes(data.runtime)}</span>
								</li>
							}
							{data.production_countries.length > 0 &&
								<li>{t('media.country')}:
									{data.production_countries.map((country, key) =>
										<span key={`country-${key}`}>{country.iso_3166_1}</span>)
									}
								</li>
							}
						</>
					)}
					{data.genres &&
						<li>{t('global.genre')}:
							{data.genres.map(genre =>
								<NextLink
									key={genre.id}
									href={`/genre/${type}-list/${genre.id}?name=${encodeURIComponent(genre.name)}`}
								>
									{genre.name}
								</NextLink>)
							}
						</li>
					}
				</ul>
			</div>
			{data.overview &&
				<div className={classNames([styles.mediaAbout, 'movie-list-info-wrapper'])}>
					<h3>{t('media.about')}</h3>
					<p>{data.overview}</p>
				</div>
			}
			{data.vote_average > 0 && <div className={styles.mediaRatings}>
				<StarRatings
					rating={data.vote_average}
					starRatedColor="rgb(var(--color-primary-blue))"
					numberOfStars={10}
					starEmptyColor="rgb(var(--color-primary-gray))"
					name='rating'
				/>
				<div className={styles.mediaRatingsInfo}>
					<p className="text-lg">
						{t('media.rating')}: <strong>{roundNumber(data.vote_average)}</strong>
					</p>
					<p className="text-sm">
						{t('media.totalVotes')}: <strong>{data.vote_count}</strong>
					</p>
				</div>
			</div>}
		</section>
	)
}

export default Index;
