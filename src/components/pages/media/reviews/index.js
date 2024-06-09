import React, {useState} from 'react';
import {useTranslation} from 'next-i18next';
import classNames from 'classnames';
import StarRatings from 'react-star-ratings/build/star-ratings';
import Button from '@/components/UI/Button';
import NextImage from '@/components/UI/NextImage';
import {truncateText} from '@/helpers/stringHelpers';
import {IMAGE_PATH} from '@/constants';
import styles from './index.module.scss';

const Index = props => {
	const {
		movieTitle,
		reviews = []
	} = props;

	const {t} = useTranslation();
	const [isTruncate, setIsTruncate] = useState([]);
	const truncateLimit = 350;

	const unTruncateString = id => {
		setIsTruncate(
			prevState => prevState.includes(id) ?
				prevState.filter(item => item !== id) : [...prevState, id]
		)
	};

	return (
		<section className={classNames([
			styles.reviewWrapper, 'movie-list-info-wrapper'
		])}>
			<h3>{t('media.reviews')}</h3>
			{reviews.length ?
				<>
					{reviews.map((review) =>
						<div key={review.id} className={styles.reviewItem}>
							<div className={styles.reviewAuthor}>
								<NextImage
									src={IMAGE_PATH(review.author_details.avatar_path)}
									alt={review.author_details.username}
									width={70}
									height={70}
									className={styles.reviewAuthorAvatar}
								/>
								<div className={styles.reviewAuthorInfo}>
									<span>{review.author_details.username}</span>
									{review.author_details.rating > 0 &&
										<div className={styles.reviewAuthorRating}>
											<StarRatings
												rating={review.author_details.rating}
												starRatedColor="rgb(var(--color-primary-blue))"
												numberOfStars={10}
												starEmptyColor="rgba(var(--color-black), 0.4)"
												name="rating"
											/>
											<span>{review.author_details.rating}/10</span>
										</div>
									}
								</div>
							</div>
							<div className={styles.reviewContent}>
								<div dangerouslySetInnerHTML={{
									__html: !isTruncate.includes(review.id) ?
										truncateText(review.content, truncateLimit) : review.content
								}}/>
								{review.content.length > truncateLimit &&
									<Button regular
											className={classNames(['gradient-text-blurred', styles.reviewContentFull])}
											onClick={() => unTruncateString(review.id)}
											data-text={!isTruncate.includes(review.id) ? t('global.more') : t('global.less')}
									>
										{!isTruncate.includes(review.id) ? t('global.more') : t('global.less')}
									</Button>
								}
							</div>
						</div>
					)}
				</>
				:
				<div className={styles.reviewItem}>
					<p className={styles.reviewContent}>
						{`${t('media.missingReview')} ${movieTitle}`}
					</p>
				</div>
			}
		</section>
	)
}

export default Index;
