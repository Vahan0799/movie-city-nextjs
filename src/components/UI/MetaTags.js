import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {APP_URL, IMAGE_PATH} from '@/constants';
import {truncateText} from '@/helpers/stringHelpers';

const MetaTags = props => {
	const {
		title,
		description,
		staticImage,
		image
	} = props;

	const router = useRouter();

	return (
		<Head>
			<meta charSet="UTF-8"/>
			<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
			<meta name="viewport"
				  content="width=device-width, initial-scale=1,user-scalable=0,shrink-to-fit=no"/>
			<link rel="apple-touch-icon" sizes="57x57 60x60 72x72 76x76 114x114 120x120 144x144 152x152"
				  href="/favicon.png"/>
			<link rel="icon" type="image/png" href="/favicon.png" sizes="16x16 32x32 64x64 128x128"/>
			<link rel="canonical" href={APP_URL + router.asPath}/>
			<meta name="title" content={`Movie City | ${title}`}/>
			{description && <meta name="description" content={truncateText(description, 120)}/>}
			<meta property="og:url" content={APP_URL + router.asPath}/>
			<meta property="og:title" content={`Movie City | ${title}`}/>
			{description && <meta property="og:description" content={truncateText(description, 120)}/>}
			{(image || staticImage) && <meta property="og:image" content={image && IMAGE_PATH(image) || APP_URL + staticImage}/>}
			<meta property="twitter:card" content="summary_large_image"/>
			<meta property="twitter:site" content="@"/>
			<meta property="twitter:url" content={APP_URL + router.asPath}/>
			<meta property="twitter:title" content={`Movie City | ${title}`}/>
			{description && <meta property="twitter:description" content={truncateText(description, 120)}/>}
			{(image || staticImage)  && <meta property="twitter:image" content={image && IMAGE_PATH(image) || APP_URL + staticImage}/>}
			<title>{title || 'Movie City'}</title>
		</Head>
	)
};

export default MetaTags;
