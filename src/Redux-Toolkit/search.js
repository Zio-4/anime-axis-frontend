import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice ({
    name: 'search',
    initialState: {
        searchQuery: '',
        searchResults: []
    },
    reducers: {
        updateSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        updateSearchResults: (state, action) => {
            state.searchResults = action.payload
        }
    }
})

export const { updateSearchQuery, updateSearchResults } = searchSlice.actions

export default searchSlice.reducer