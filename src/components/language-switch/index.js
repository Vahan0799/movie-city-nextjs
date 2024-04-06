import React from 'react';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import Button from '@/components/UI/Button';
import styles from './index.module.scss';

const Index = () => {
	const router = useRouter();

	const handleLocaleChange = locale => {
		router.push({
			pathname: router.pathname,
			query: router.query,
		}, null, { locale });

		Cookies.set('NEXT_LOCALE', locale, {expires: 14});
	};

	return(
		<ul className={styles.languageSwitchContainer}>
			{router.locales.map(locale => (
				<li key={locale}
					className={classNames([
						styles.languageSwitchItem,
						locale === router.locale && styles.languageSwitchItemActive
					])}
				>
					<Button
						regular
						className="gradient-text-blurred"
						data-text={locale.toUpperCase()}
						onClick={() => handleLocaleChange(locale)}
					>
						{locale.toUpperCase()}
					</Button>
				</li>
			))}
		</ul>
	)
};

export default Index;
