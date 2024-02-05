import React, {createContext, useState, useEffect} from 'react';
import {getPopularMovieOfDay} from '@/services/global';

const PopularMovieContext = createContext();

const PopularMovieProvider = ({children}) => {
	const [popularMovie, setPopularMovie] = useState({});

	useEffect(() => {
		getPopularMovieOfDay()
			.then(response => {
				setPopularMovie(response)
			})
	},[]);

	return (
		<PopularMovieContext.Provider value={popularMovie}>
			{children}
		</PopularMovieContext.Provider>
	)
}
export { PopularMovieContext, PopularMovieProvider };
