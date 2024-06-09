import React from 'react';
import {useTranslation} from 'next-i18next';
import {motion} from 'framer-motion';
import classNames from 'classnames';
import NextLink from '@/components/UI/NextLink';
import NextImage from '@/components/UI/NextImage';
import {IMAGE_PATH} from '@/constants';
import {roundNumber, lowercaseString, formatDate, extractYear} from '@/helpers/stringHelpers';
import {fadeInVariants} from '@/helpers/moduleHelpers';
import styles from './index.module.scss';

const Index = props => {
    const {
        media,
        mediaType = 'movie',
        delay
    } = props;

    const {t} = useTranslation();

    return (
        <motion.div
            className={styles.mediaCardLabelContainer}
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeInVariants}
            transition={{type: 'tween', delay: delay * 0.15}}
        >
            <NextLink
                href={`/media/${mediaType}/${media.id}-${lowercaseString(media?.original_title || media?.original_name)}`}
                title={`${media?.title || media?.name} (${extractYear(media?.release_date || media?.first_air_date)})`}
                className={classNames([styles.mediaCardLabel, 'card-label-hover'])}
            >
                <div className={styles.mediaCardImage}>
                    <NextImage
                        src={IMAGE_PATH(media.poster_path)}
                        alt={media?.title || media?.name}
                    />
                </div>
                <div className={styles.mediaCardDetails}>
                    <h4>{media?.title || media?.name}</h4>
                    <p>{t('media.year')}: <strong>{formatDate(media?.release_date || media?.first_air_date)}</strong></p>
                    <p>{t('media.totalVotes')}: <strong>{media.vote_count}</strong></p>
                    <span className="vote-circle">{roundNumber(media.vote_average)}</span>
                </div>
            </NextLink>
        </motion.div>
    )
}

export default Index;
