import {createSlice} from '@reduxjs/toolkit';

export const index = createSlice({
    name: 'GLOBAL',
    initialState: {
        popularMovies: [],
        search: {
            isQuery: false,
            searched: false
        },
        searchPageResults: []
    },

    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },

        setSearchStates: (state, {payload}) => {
            state.search = payload;
        },

        setSearchPageResults: (state, action) => {
            state.searchPageResults = action.payload;
        }
    }
})

export const {
    setPopularMovies,
    setSearchStates,
    setSearchPageResults
} = index.actions;

export default index.reducer;
