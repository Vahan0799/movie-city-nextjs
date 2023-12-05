import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import NextImage from '@/components/UI/next-image';
import {dispatch} from '@/helpers';
import {setClipKey, setShowClip} from '@/redux/slices/movieSlice';
import {CLIP_THUMBNAIL} from '@/constants';
import PlayIcon from '@/assets/images/icons/play-btn.svg';
import styles from './index.module.scss';

const Index = props => {
	let {items = []} = props;

	const swiperOptions = {
		modules: [Pagination],
		slidesPerView: 1.2,
		slidesPerGroup: 1,
		speed: 800,
		pagination: {
			type: 'progressbar',
			el: '.clip-pagination',
			clickable: true
		},
		breakpoints: {
			768:{
				slidesPerView: 3,
				slidesPerGroup: 3
			}
		}
	};

	const triggerClip = id => {
		dispatch(setClipKey(id));
		dispatch(setShowClip(true));
	};

	useEffect(() => {
		return () => items = [];
	},[]);

	return (
		<section className="slider-info-wrapper">
			<div className={styles.clipList}>
				<Swiper {...swiperOptions}>
					{items.length > 0 && items.map((clip, key) =>
						<SwiperSlide key={`movie-clip-${key}`}>
							<div className={styles.clipListItem}>
								<NextImage
									onClick={() => triggerClip(clip.key)}
									src={CLIP_THUMBNAIL(clip.key)}
									width={384}
									height={216}
									wrapperClass="button"
									alt="Clip Image"
								/>
								<NextImage
									wrapperClass={styles.clipPlay}
									src={PlayIcon} alt="play-icon" width={25} height={25}
								/>
							</div>
						</SwiperSlide>
					)}
				</Swiper>
				<div className="swiper-pagination clip-pagination"/>
			</div>
		</section>
	)
}

export default Index;
