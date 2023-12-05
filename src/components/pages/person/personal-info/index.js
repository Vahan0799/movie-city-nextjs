import React from 'react';
import {useTranslation} from 'next-i18next';
import styles from './index.module.scss';
import NextImage from '@/components/UI/next-image';
import {IMAGE_PATH} from '@/constants';
import Facebook from '@/assets/svg/facebook-icon.svg';
import Twitter from '@/assets/svg/twitter-icon.svg';
import Instagram from '@/assets/svg/instagram-icon.svg';
import UrlIcon from '@/assets/svg/url-icon.svg';

const Index = props => {
    const {
        details,
        social
    } = props;

    const {t} = useTranslation();

    const calculateAge = birthday => {
        const birthdate = new Date(birthday);
        const currentDate = new Date();
        const age = currentDate.getFullYear() -
            birthdate.getFullYear() -
            (
                currentDate < new Date(currentDate.getFullYear(),
                    birthdate.getMonth(), birthdate.getDate()) ? 1 : 0
            );

        return age;
    };

    const calculateDeathAge = (birthday, death) => {
        const birthDate = new Date(birthday);
        const deathDate = new Date(death);

        let age = deathDate.getFullYear() - birthDate.getFullYear();

        if (deathDate.getMonth() < birthDate.getMonth() ||
            (deathDate.getMonth() === birthDate.getMonth() && deathDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    return (
        <section className={styles.personalInfoWrapper}>
            <div className={styles.personalInfoContainer}>
                <NextImage
                    wrapperClass={styles.personalInfoAvatar}
                    src={IMAGE_PATH(details.profile_path)}
                    alt={details.name}
                />
                <div className={styles.personalInfo}>
                    {(details.homepage || social) &&
                        <div className={styles.personalInfoMedia}>
                            {social.facebook_id &&
                                <a
                                    href={`https://www.facebook.com/${social.facebook_id}`}
                                    className="btn btn-secondary"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit Facebook"
                                >
                                    <NextImage src={Facebook} alt="facebook"/>
                                </a>
                            }
                            {social.twitter_id &&
                                <a
                                    href={`https://twitter.com/${social.twitter_id}`}
                                    className="btn btn-secondary"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit Twitter"
                                >
                                    <NextImage src={Twitter} alt="twitter"/>
                                </a>
                            }
                            {social.instagram_id &&
                                <a
                                    href={`https://instagram.com/${social.instagram_id}`}
                                    className="btn btn-secondary"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit Instagram"
                                >
                                    <NextImage src={Instagram} alt="instagram"/>
                                </a>
                            }
                            {details.homepage &&
                                <a
                                    href={details.homepage}
                                    className="btn btn-secondary homepage"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit Homepage"
                                >
                                    <NextImage src={UrlIcon} alt="url"/>
                                </a>
                            }
                        </div>
                    }
                    <h3>{t('person.personal-info')}</h3>
                    <ul>
                        <li>
                            <b>{t('person.known-for')}</b>
                            <span>{!details.known_for_department ? '-' : details.known_for_department}</span>
                        </li>
                        {(details.gender === 1 || 2) &&
                            <li>
                                <b>{t('person.gender')}</b>
                                <span>
                                    {details.gender === 2 ? t('person.male') : t('person.female')}
                                </span>
                            </li>
                        }
                        <li>
                            <b>{t('person.birthday')}</b>
                            {details.birthday ? (
                                <span>
                                    {details.birthday}
                                    {!details.deathday && <> ({calculateAge(details.birthday)} {t('person.years')})</>}
                                </span>
                            ) : (<span>-</span>)}
                        </li>
                        {details.deathday && <li>
                            <b>{t('person.death')}</b>
                            <span>
                                {details.deathday} ({calculateDeathAge(details.birthday, details.deathday)} {t('person.years')})
                            </span>
                        </li>}
                        <li>
                            <b>{t('person.birthplace')}</b>
                            <span>{!details.place_of_birth ? '-' : details.place_of_birth}</span>
                        </li>
                        <li>
                            <b>{t('person.known-as')}</b>
                            {details.also_known_as.length > 0 ? <>
                                {details.also_known_as.map((item, index) => <span key={index}>{item}</span>)}
                            </> : <span>-</span>}
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Index;
