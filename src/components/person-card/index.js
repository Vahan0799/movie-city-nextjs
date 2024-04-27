import React from 'react';
import classNames from 'classnames';
import NextImage from '@/components/UI/NextImage';
import NextLink from '@/components/UI/NextLink';
import {lowercaseString} from '@/helpers/stringHelpers';
import {IMAGE_PATH} from '@/constants';
import FemaleFallback from '@/assets/svg/female-fallback.svg';
import MaleFallback from '@/assets/svg/male-fallback.svg';
import styles from './index.module.scss';

const Index = props => {
    const {
        member,
        secondary
    } = props;

    return (
        <NextLink href={`/person/${member.id}-${lowercaseString(member.name)}`} className={classNames([
            styles.personItem,
            secondary && 'card-label-hover w-full'
        ])}>
            <figure className={secondary ? styles.personSecondary : styles.personPrimary}>
                {secondary ? (
                    <NextImage
                        src={`https://image.tmdb.org/t/p/h632/${member.profile_path}`}
                        fallBackSrc={member.gender === 1 ? FemaleFallback : MaleFallback}
                        width={90}
                        height={135}
                        quality={80}
                        alt={member.name}
                    />
                ) : (
                    <NextImage
                        src={IMAGE_PATH(member.profile_path)}
                        fallBackSrc={member.gender === 1 ? FemaleFallback : MaleFallback}
                        width={300}
                        height={450}
                        alt={member.name}
                        className="w-full"
                    />
                )}
                <figcaption className={secondary ? styles.personSecondaryInfo : styles.personPrimaryInfo}>
                    <h4 className="text-oneline">{member.name}</h4>
                    <h5 className="text-oneline">
                        {member.roles ? member.roles[0].character : member.character || member.job}
                    </h5>
                </figcaption>
            </figure>
        </NextLink>
    )
}

export default Index;
