import React from 'react';
import {IMAGE_PATH} from '@/constants';
import ImageComponent from '@/components/UI/image-component';
import styles from './index.module.scss';
import classNames from 'classnames';
import StarRatings from 'react-star-ratings/build/star-ratings';
import {useTranslation} from 'next-i18next';

const Reviews = props => {
	const {
		movieTitle,
		reviews = []
	} = props;

	const {t} = useTranslation();

	return (
		<section className={classNames([
			styles.reviewWrapper, 'movie-info-wrapper'
		])}>
			<h3>{t('movie.reviews')}</h3>
			{reviews.length ? (
				<>
					{reviews.map((review) => {
						return (
							<div key={review.id}
								 className={styles.reviewItem}
							>
								<div className={styles.reviewAuthor}>
									<ImageComponent
										src={IMAGE_PATH(review.author_details.avatar_path)}
										alt={'avatar'}
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
									{review.content}
								</div>
							</div>
						)
					})}
				</>
			) : (
				<div className={styles.reviewItem}>
					<p className={styles.reviewContent}>
						{`${t('movie.missingReview')} ${movieTitle}`}
					</p>
				</div>
			)}
		</section>
	)
}

export default Reviews;