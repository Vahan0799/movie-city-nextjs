import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import {useTranslation} from 'next-i18next';
import StarRatings from 'react-star-ratings/build/star-ratings';
import NextLink from '@/components/UI/NextLink';
import NextImage from '@/components/UI/next-image';
import {IMAGE_PATH} from '@/constants';
import {roundNumber, lowercaseString, formatDate} from '@/helpers/stringHelpers';
import {fadeInVariants, floatUpVariants} from '@/helpers/moduleHelpers';
import styles from './index.module.scss';

const Index = props => {
    const {
        media,
        mediaType = 'movie',
        delay,
        detailed,
        bordered
    } = props;

    const {t} = useTranslation();

    return (
        <div className="h-full p-3">
            <NextLink
                className={styles.media}
                href={`/media/${mediaType}/${media.id}-${lowercaseString(media?.original_title || media?.original_name)}`}
                title={media?.title || media?.name}
            >
                <figure className="full-figure">
                    <motion.div
                        className={classNames([
                            styles.mediaImage,
                            detailed && styles.mediaImageDetailed
                        ])}
                        initial="floatDown"
                        animate="floatUp"
                        exit="floatDown"
                        variants={floatUpVariants}
                        transition={{type: 'spring', stiffness: 100, delay: delay * 0.12}}
                    >
                        <div className={classNames([bordered && [styles.mediaConic, 'conic-borders']])}>
                            <NextImage
                                className="transition-transform duration-500"
                                src={IMAGE_PATH(media.poster_path)}
                                width={300} height={450} alt={`Title - ${media?.title || media?.name}`}
                            />
                        </div>
                        {detailed &&
                            <div className={styles.mediaDetails}>
                                <ul>
                                    <li><span>{t('media.year')}: </span>
                                        {formatDate(media?.release_date || media?.first_air_date)}
                                    </li>
                                    <li><span>{t('media.totalVotes')}: </span> {media.vote_count}</li>
                                    <li><span>{t('media.popularity')}: </span>{media.popularity}</li>
                                </ul>
                                <span className={classNames([
                                    styles.mediaDetailsAverage, 'vote-circle'
                                ])}>
                                    {roundNumber(media.vote_average)}
                                </span>
                            </div>
                        }
                    </motion.div>
                    <motion.figcaption
                        className="mt-3"
                        initial="hide"
                        animate="show"
                        exit="hide"
                        variants={fadeInVariants}
                        transition={{type: 'tween', delay: delay * 0.15}}
                    >
                        {detailed &&
                            <div className={styles.mediaDetailsRatings}>
                                <StarRatings
                                    rating={media.vote_average || 0}
                                    starRatedColor="rgb(var(--color-primary-blue))"
                                    numberOfStars={10}
                                    starEmptyColor="rgba(var(--color-black), 0.4)"
                                    name="rating"
                                />
                            </div>
                        }
                        <p className={styles.mediaTitle}>{media?.title || media?.name}</p>
                    </motion.figcaption>
                </figure>
            </NextLink>
        </div>
    )
}

export default Index;
