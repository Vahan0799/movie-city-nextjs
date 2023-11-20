import {createSlice} from '@reduxjs/toolkit';

export const index = createSlice({
    name: 'GLOBAL',
    initialState: {
        popularMovies: [],
        search: {
            results: null,
            query: ''
        },
        searchPageResults: [],
        popularMovie: {},
    },

    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },

        setSearchResults: (state, {payload}) => {
            state.search = payload;
        },

        setSearchPageResults: (state, action) => {
            state.searchPageResults = action.payload;
        },

        setPopularMovieOfDay: (state, action) => {
            state.popularMovie = action.payload;
        }
    }
})

export const {
    setPopularMovies,
    setSearchResults,
    setSearchPageResults,
    setPopularMovieOfDay
} = index.actions;

export default index.reducer;
