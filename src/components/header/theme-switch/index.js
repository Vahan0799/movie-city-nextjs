import React, {useEffect} from 'react';
import classNames from 'classnames';
import {useTheme} from 'next-themes';
import styles from './index.module.scss';

const Index = () => {
	const {systemTheme, theme, setTheme} = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;

	const changeCurrentTheme = () => setTheme(currentTheme === 'dark' ? 'light' : 'dark');

	const setThemeByTimeOfDay = () => {
		const now = new Date();
		const hours = now.getHours();

		const isDaytime = hours >= 7 && hours <= 18;

		theme === 'system' && setTheme(isDaytime ? 'light' : 'dark');
	};

	useEffect(() => setThemeByTimeOfDay(), []);

	return (
		<div className={styles.toggleContainer}>
			<input type="checkbox" id="theme-switcher"
				   className="hidden" onChange={changeCurrentTheme}
			/>
			<label htmlFor="theme-switcher" className={classNames([styles.toggleButton, 'theme-switcher'])}>
				<span/>
			</label>
		</div>
	)
}

export default Index;
