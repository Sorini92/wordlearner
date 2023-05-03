import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    words: [],
    sortType: 'english',
    wordsLoadingStatus: 'loading',
    error: false
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
        modifyWord: (state, action) => {
            state.words = state.words.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
        },
        deleteWord: (state, action) => {
            state.words = state.words.filter(item => item.id !== action.payload)
        },
        emptyBase:(state) => {
            state.wordsLoadingStatus = 'idle';
        },
        errorOnFetch: (state) => {
            state.error = true;
        },
        activeSortTypeChanged: (state, action) => {state.sortType = action.payload},
        sortBy: (state, action) => {
            switch(action.payload) {
                case 'date': 
                    state.words = state.words.sort((a, b) => b.date - a.date);
                    break
                case 'english': 
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
                case 'russian': 
                state.words = state.words.sort((a, b) => {
                    if (a.russian > b.russian) {
                        return 1;
                    }
                    if (a.russian < b.russian) {
                        return -1;
                    }
                    return 0;
                });
                break
                default:
                    state.words = state.words.sort((a, b) => b.date - a.date);
            }
        },
    },
});

const {actions, reducer} = wordsSlice;

export default reducer;
export const {
    emptyBase,
    setWords,
    addWord,
    modifyWord,
    deleteWord,
    errorOnFetch,
    activeSortTypeChanged,
    sortBy
} = actions;