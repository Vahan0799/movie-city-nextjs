import React, {useEffect} from 'react';
import classNames from 'classnames';
import {MEDIA_API} from '@/constants';
import styles from './index.module.scss';

const Index = props => {
	const {mediaId, mediaTitle} = props;

	const mediaPlayerOptions = {
		search: {
			imdb: mediaId,
			title: mediaTitle
		},
		players: {
			alloha: {
				enable: true,
				position: 1,
				token: '{token}'
			},
			videocdn: {
				enable: true,
				position: 2,
				token: '{token}'
			}
		},
	};

	useEffect(() => {
		const initializeKinobox = () => new Kinobox('.media_player', mediaPlayerOptions).init()

		const loadKinoboxScript = () => {
			const script = document.createElement('script');
			script.src = MEDIA_API;
			script.async = true;
			script.onload = initializeKinobox;
			document.body.appendChild(script);
		};

		typeof Kinobox === 'undefined' ? loadKinoboxScript() : initializeKinobox();

	}, [mediaId]);

	return (
		<section className={classNames([styles.clipContainer, 'movie-list-info-wrapper'])}>
			<div className="media_player"/>
		</section>
	)
}

export default Index;
