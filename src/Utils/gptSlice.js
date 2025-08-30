import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : 'gpt',
    initialState : {
        showGptSearch : false,
        movieResults: null,
        movieNames : null
    },
    reducers : {
        toggleGptSearchView : (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMoviesResult : (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieResults = movieResults;
            state.movieNames = movieNames
        },
        setLoading: (state) => { // ✅ New action to start loading
            state.isLoading = true;
        },
        unsetLoading: (state) => { // ✅ New action to stop loading
            state.isLoading = false;
        },
    }
});


export const {toggleGptSearchView, addGptMoviesResult, setLoading, unsetLoading} = gptSlice.actions;

export default gptSlice.reducer;