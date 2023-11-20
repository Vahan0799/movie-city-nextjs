import {$api} from '@/api';
import {API_KEY} from '@/constants';
import {filterFetchResults} from '@/helpers';

export const getPopularMovies = async locale => {
        return await $api().get(`/movie/popular?api_key=${API_KEY}&language=${locale}&page=2`)
            .then((response) => response.data.results.filter(item => filterFetchResults(item)))
            .catch((error) => console.log(error))
};

export const getTopMovies = async (locale, page) => {
    return await $api().get(`/movie/top_rated?api_key=${API_KEY}&language=${locale}&page=${page || 1}`)
        .then((response) => {
            const filterItems = response.data.results.filter(item => filterFetchResults(item))
            return filterItems.slice(0, 10)
        })
        .catch((error) => console.log(error))
};

export const getSearchResults = async (keyword, locale, page) => {
        return await $api().get(`/search/multi?api_key=${API_KEY}&language=${locale}&page=${page || 1}`, {
                params: {
                    query: keyword
                }
        })
        .then((response) => response.data)
        .catch((error) => console.log(error))
}

export const getPopularMovieOfDay = async () => {
    return await $api().get(`/trending/movie/day?api_key=${API_KEY}`)
        .then((response) => response.data.results[0])
        .catch((error) => console.log(error))
}
