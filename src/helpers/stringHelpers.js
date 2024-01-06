import moment from 'moment';

export const roundNumber = number => Math.round(number * 100) / 100;

export const extractYear = date => moment(date, 'YYYY/MM/DD').year();

export const formatDate = date => moment(date).format('DD/MM/YYYY');

export const lowercaseString = str => {
	if (str) {
		const replacedStr = str.replace(/[^a-zA-Z0-9]+/g, '-');

		return replacedStr.toLowerCase();
	}
};

export const capitalizeFirstLetter = text => {
	return text && text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncateText = (text, limit, dots = true) => {
	if (text && text.length > limit) {
		const words = text.split(' ');
		let truncatedText = '';
		for (const word of words) {
			if ((truncatedText + word).length <= limit - 3) {
				truncatedText += word + ' ';
			} else {
				break;
			}
		}
		return !dots ? truncatedText.trim() : truncatedText.trim() + '...';
	} else {
		return text;
	}
};
