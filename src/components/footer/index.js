import React from 'react';
import classNames from 'classnames';
import NextLink from '@/components/UI/NextLink';
import FooterLogo from '@/components/svg/footer-logo';
import {dynamicBackground} from '@/helpers';
import {lowercaseString} from '@/helpers/stringHelpers';
import styles from './index.module.scss';

const Index = props => {
	const {data} = props;

	return (
		<footer className={classNames([styles.footer, 'fixed-background'])}
				style={data.backdrop_path && dynamicBackground(data.backdrop_path)}
		>
			<div className={styles.footerWrapper}>
				{data.backdrop_path &&
					<NextLink
						href={`/media/movie/${data.id}-${lowercaseString(data.original_title)}`}
						className={styles.footerUrl}
					/>
				}
				<div className={classNames([styles.footerContainer, 'page-container'])}>
					<div className={classNames([styles.footerMain, 'darken-background'])}>
						<NextLink href="/"><FooterLogo/></NextLink>
						<p>© {new Date().getFullYear()} MovieCity</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Index;
