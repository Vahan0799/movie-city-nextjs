import React, {useEffect} from 'react';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import NextLink from '@/components/UI/NextLink';
import FooterLogo from '@/components/svg/footer-logo';
import {getPopularMovieOfDay} from '@/services/global';
import {setPopularMovieOfDay} from '@/redux/slices/globalSlice';
import {dispatch, dynamicBackground} from '@/helpers';
import {lowercaseString} from '@/helpers/stringHelpers';
import styles from './index.module.scss';

const Index = () => {
	const {popularMovie} = useSelector(state => state.global);

	useEffect(() => {
		if (Object.keys(popularMovie).length === 0) {
			getPopularMovieOfDay()
				.then(response => {
					dispatch(setPopularMovieOfDay(response))
				})
		}
	},[]);

	return (
		<footer className={classNames([styles.footer, 'fixed-background'])}
				style={popularMovie.backdrop_path && dynamicBackground(popularMovie.backdrop_path)}
		>
			<div className={styles.footerWrapper}>
				{popularMovie.backdrop_path &&
					<NextLink
						href={`/media/movie/${popularMovie.id}-${lowercaseString(popularMovie.original_title)}`}
						className={styles.footerUrl}
					/>
				}
				<div className={classNames([styles.footerContainer, 'page-container'])}>
					<div className={classNames([styles.footerMain, 'darken-background'])}>
						<NextLink href="/"><FooterLogo/></NextLink>
						<p>© {new Date().getFullYear()} MovieCity</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Index;
