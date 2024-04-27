import React from 'react';
import {useTranslation} from 'next-i18next';
import NextImage from '@/components/UI/NextImage';
import NextLink from '@/components/UI/NextLink';
import PrevArrow from '@/components/svg/prev-arrow';
import {extractYear, lowercaseString} from '@/helpers/stringHelpers';
import {IMAGE_PATH} from '@/constants';
import styles from './index.module.scss';

const Index = props => {
	const {
		media = {},
		mediaType = 'movie'
	} = props;

	const {t} = useTranslation();

	return (
		<section className={styles.mediaLabelWrapper}>
			<figure className={styles.mediaLabel}>
				<NextLink href={`/media/${mediaType}/${media.id}-${lowercaseString(media.original_title)}`}>
					<NextImage
						src={IMAGE_PATH(media.poster_path)}
						width={150}
						height={220}
						alt={`Poster - ${media?.original_title || media?.original_name}`}
					/>
				</NextLink>
				{(media.title || media.name) &&
					<figcaption>
						<h1 className="flex flex-wrap gap-2">
							<NextLink
								href={`/media/${mediaType}/${media.id}-${lowercaseString(media.original_title || media.original_name)}`}>
								{media.title || media.name}
							</NextLink>
							<span className="inline-block opacity-50 font-bold">
								({extractYear(media.release_date || media.first_air_date)})
							</span>
						</h1>
						<NextLink
							href={`/media/${mediaType}/${media.id}-${lowercaseString(media.original_title || media.original_name)}`}>
							<PrevArrow/>
							{t('media.back')}
						</NextLink>
					</figcaption>
				}
			</figure>
		</section>
	)
}

export default Index;
