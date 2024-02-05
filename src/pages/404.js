import React from 'react';
import Seo from '@/components/UI/Seo';
import NotFoundBanner from '@/components/pages/not-found-banner';

const NotFound = () => {
	return (
		<>
			<Seo title="Not Found"/>
			<NotFoundBanner/>
		</>
	)
}

export default NotFound;
