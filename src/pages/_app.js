import React from 'react';
import {ThemeProvider} from 'next-themes';
import {appWithTranslation} from 'next-i18next';
import NProgress from 'nprogress';
import MetaTags from '@/components/UI/MetaTags';
import StoreProvider from '@/providers/StoreProvider';
import {PopularMovieProvider} from '@/providers/PopularMovieContext';
import '@/styles/index.scss';

NProgress.configure({easing: 'linear', speed: 700, showSpinner: false});

const MyApp = ({Component, pageProps}) => {
	const title = pageProps.title || '';
	const description = pageProps.description || '';
	const image = pageProps?.image;
	const staticImage = pageProps?.staticImage;

	return (
		<>
			<MetaTags
				title={title}
				description={description}
				image={image} staticImage={staticImage}
			/>
			<PopularMovieProvider>
				<StoreProvider>
					<ThemeProvider attribute="class">
						<Component {...pageProps}/>
					</ThemeProvider>
				</StoreProvider>
			</PopularMovieProvider>
		</>
	)
}

export default appWithTranslation(MyApp);
