import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    words: [],
    wordsLoadingStatus: 'loading',
    sortType: 'date'
}

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        addWords: (state, action) => {
            state.words = action.payload
            state.wordsLoadingStatus = 'idle';
        },
        activeSortTypeChanged: (state, action) => {state.sortType = action.payload},
        sortBy: (state, action) => {
            switch(action.payload) {
                case 'date': 
                    state.pizzas = state.pizzas.sort((a, b) => b.rating - a.rating);
                    break
                case 'alphabet': 
                    state.pizzas = state.pizzas.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    });
                    break
                default:
                    state.words = state.words.sort();
            }
        },
    },
});

const {actions, reducer} = wordsSlice;

export default reducer;
export const {
    addWords,
    activeSortTypeChanged,
    sortBy
} = actions;