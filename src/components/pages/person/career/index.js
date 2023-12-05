import React, {useState} from 'react';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';
import SliderList from '@/components/slider-list';
import NextLink from '@/components/UI/NextLink';
import NextImage from '@/components/UI/next-image';
import {lowercaseString, truncateText, extractYear} from '@/helpers/stringHelpers';
import {IMAGE_PATH, BACKDROP_PATH} from '@/constants';
import styles from './index.module.scss';

const Index = props => {
    const {
        details = {},
        topMovies,
        careerList
    } = props;

    const {t} = useTranslation();
    const [isTruncate, setIsTruncate] = useState(true);

    const truncateLimit = 400;
    const truncatedBiography = truncateText(details.biography, truncateLimit);

    const filterMap = (details, media) => {
        const mediaDate = new Date(media.release_date || media.first_air_date);
        const birthday = new Date(details.birthday);

        if (isNaN(mediaDate) || isNaN(birthday)) {
            return false;
        }

        const filteredItem = birthday <= mediaDate &&
            !['Self', 'Herself', 'Himself', 'self', 'archive footage'].some(str => media.character.includes(str));

        return filteredItem;
    };

    return (
        <section className={styles.careerWrapper}>
            <h1>{details.name}</h1>
            <div className={styles.careerContainer}>
                <div className={styles.careerBiography}>
                    <h3>{t('person.biography')}</h3>
                    {details.biography ?
                        <p>{isTruncate ? truncatedBiography : details.biography}
                            {details.biography.length > truncateLimit &&
                                <span
                                    className="gradient-text"
                                    onClick={() => setIsTruncate(!isTruncate)}
                                >
                                {isTruncate ? t('global.more') : t('global.less')}
                            </span>
                            }
                        </p>

                        : <p>{t('person.missing-biography')} {details.name}</p>
                    }
                </div>
                {topMovies.length > 0 &&
                    <div className={styles.careerKnown}>
                        <h3>{t('person.known-for')}</h3>
                        <SliderList
                            listType="top-popular-movies"
                            items={topMovies}
                        />
                    </div>
                }
            </div>

            {careerList.length > 0 &&
                <div className={classNames([
                    styles.careerListWrapper, 'darken-background'
                ])}>
                    <h3>{t('person.acting-career')}</h3>

                    <ul className={styles.careerList}>
                        {careerList.map(media => {
                            if (filterMap(details, media)) {
                                return (
                                    <li className={styles.careerListItem} key={`career-media-${media.id}`}>
                                        <NextLink
                                            href={`/media/${media.type}/${media.id}-${lowercaseString(media.original_title || media.original_name)}`}
                                            className={styles.careerListMedia}
                                        >
                                            <NextImage
                                                src={IMAGE_PATH(media.poster_path)}
                                                alt={`Title: ${media.title || media.name}`}
                                            />
                                            <div className={styles.careerListDescription}>
                                                {(media.release_date || media.first_air_date) &&
                                                    <span>{extractYear(media.release_date || media.first_air_date)}</span>
                                                }
                                                <h4 className="font-bold w-fit">{media.title || media.name}</h4>
                                                <p>
                                                    {t('person.character')}:
                                                    <span className="font-bold"> {media.character} </span>
                                                </p>
                                            </div>
                                        </NextLink>
                                        {media.backdrop_path &&
                                            <div
                                                className={styles.careerListItemBackground}
                                                style={{backgroundImage: `url(${BACKDROP_PATH(media.backdrop_path)})`}}
                                            />
                                        }
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            }
        </section>

    )
}

export default Index;
