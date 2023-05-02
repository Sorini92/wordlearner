import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    words: [],
    wordsLoadingStatus: 'loading',
    sortType: 'alphabet'
}

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        setWords: (state, action) => {
            state.words = action.payload
            state.wordsLoadingStatus = 'idle';
        },
        addWord: (state, action) => {
            state.words.push(action.payload)
        },
        deleteWord: (state, action) => {
            state.words = state.words.filter(item => item.id !== action.payload)
        },
        activeSortTypeChanged: (state, action) => {state.sortType = action.payload},
        sortBy: (state, action) => {
            switch(action.payload) {
                case 'date': 
                    state.words = state.words.sort((a, b) => b.date - a.date);
                    break
                case 'alphabet': 
                    state.words = state.words.sort((a, b) => {
                        if (a.english > b.english) {
                            return 1;
                        }
                        if (a.english < b.english) {
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
    setWords,
    addWord,
    deleteWord,
    activeSortTypeChanged,
    sortBy
} = actions;