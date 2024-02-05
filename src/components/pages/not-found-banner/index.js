import React, {useContext} from 'react';
import NextLink from '@/components/UI/NextLink';
import {PopularMovieContext} from '@/providers/PopularMovieContext';
import {dynamicBackground} from '@/helpers';
import {lowercaseString} from '@/helpers/stringHelpers';
import styles from './index.module.scss';

const NotFoundBanner = () => {
	const popularMovie = useContext(PopularMovieContext);

	return (
		<section className={styles.notFoundWrapper}
				 style={popularMovie.backdrop_path && dynamicBackground(popularMovie.backdrop_path)}
		>
			{popularMovie.backdrop_path &&
				<NextLink
					href={`/media/movie/${popularMovie.id}-${lowercaseString(popularMovie.original_title)}`}
				/>
			}
			<div className={styles.notFoundContainer}>
				<h1 className="gradient-text-blurred" data-text="404">404</h1>
				<h2>Oops, seems something went wrong!</h2>
				<NextLink href="/" className="btn btn-secondary">Go to HOME</NextLink>
			</div>
		</section>
	)
}

export default NotFoundBanner;
