import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from '../../hooks/useGetData';

const initialState = {
    words: [],
    sortType: 'from new',
    letter: '',
    wordsLoadingStatus: 'loading',
    currentPage: 1,
    totalPages: 1,
    wordsPerUpload: 30
}

export const fetchWords = createAsyncThunk(
    'words/fetchWords',
    async (id) => {
        const {request} = useGetData();
        
        const linkToWords = {
            firstUrl: 'users',
            secondUrl: id,
            thirdUrl: 'words'
        }

        return await request(linkToWords);
    }
);

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        addWord: (state, action) => {
            state.words.unshift(action.payload)
        },
        modifyWord: (state, action) => {
            state.words = state.words.map((item) => {
                if (item.id === action.payload.id) {
                    item = action.payload;
                    return item
                }
                return item
            })
        },
        deleteWord: (state, action) => {
            state.words = state.words.filter(item => item.id !== action.payload)
        },
        deleteWords: (state, action) => {
            state.words = state.words.filter(item => !action.payload.includes(item.id));
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setLetter: (state, action) => {
            state.letter = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setWordsPerUpload: (state, action) => {
            state.wordsPerUpload = action.payload;
        },
        activeSortTypeChanged: (state, action) => {state.sortType = action.payload},
        sortBy: (state, action) => {
            switch(action.payload) {
                case 'from new': 
                    state.words = state.words.sort((a, b) => b.date - a.date);
                    break
                case 'from old': 
                    state.words = state.words.sort((a, b) => a.date - b.date);
                    break
                case 'a to z': 
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
                case 'z to a': 
                    state.words = state.words.sort((a, b) => {
                        if (b.english > a.english) {
                            return 1;
                        }
                        if (b.english < a.english) {
                            return -1;
                        }
                        return 0;
                    });
                    break
                case 'а to я': 
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
                case 'я to а': 
                    state.words = state.words.sort((a, b) => {
                        if (b.russian > a.russian) {
                            return 1;
                        }
                        if (b.russian < a.russian) {
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchWords.pending, state => {
                state.wordsLoadingStatus = 'loading'
            })
            .addCase(fetchWords.fulfilled, (state, action) => {
                state.wordsLoadingStatus = 'idle';
                state.words = action.payload.sort((a, b) => b.date - a.date);
            })
            .addCase(fetchWords.rejected, state => {
                state.wordsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = wordsSlice;

export default reducer;
export const {
    wordsFetching,
    wordsFetched,
    wordsFetchingError,
    addWord,
    modifyWord,
    deleteWord,
    deleteWords,
    setLetter,
    setPage,
    setWordsPerUpload,
    setTotalPages,
    activeSortTypeChanged,
    sortBy
} = actions;