import React, {useContext} from 'react';
import classNames from 'classnames';
import {PopularMovieContext} from '@/providers/PopularMovieContext';
import Header from '@/components/header/index';
import Footer from '@/components/footer';
import {dynamicBackground} from '@/helpers';
import styles from './index.module.scss';

const Index = props => {
	const {
		children,
		backgroundPoster,
		className
	} = props;

	const popularMovie = useContext(PopularMovieContext);

	return (
		<main>
			<Header/>
			<div className={classNames(['page', backgroundPoster && 'fixed-background'])}
				 style={backgroundPoster && dynamicBackground(backgroundPoster)}
			>
				<div className={classNames([styles.containerWrapper, className])}>
					<div className={classNames([
						'page-container', styles.container
					])}>
						{children}
					</div>
				</div>
			</div>
			<Footer data={popularMovie}/>
		</main>
	)
};

export default Index;
