import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from '../../hooks/useGetData';

const initialState = {
    words: [],
    sortType: 'a to z',
    wordsLoadingStatus: 'loading',
    currentPage: 1,
    totalPages: 1,
    wordsPerUpload: 30
}

export const fetchIrregularVerbs = createAsyncThunk(
    'irregularVerbs/fetchWords',
    async () => {
        const {request} = useGetData();
        const linkToWords = {
            firstUrl: 'irregularVerb'
        }
        return await request(linkToWords);
    }
);

const irregularVerbsSlice = createSlice({
    name: 'irregularVerbs',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
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
                case 'a to z': 
                    state.words = state.words.sort((a, b) => {
                        if (a.baseForm > b.baseForm) {
                            return 1;
                        }
                        if (a.baseForm < b.baseForm) {
                            return -1;
                        }
                        return 0;
                    });
                    break
                case 'z to a': 
                    state.words = state.words.sort((a, b) => {
                        if (b.baseForm > a.baseForm) {
                            return 1;
                        }
                        if (b.baseForm < a.baseForm) {
                            return -1;
                        }
                        return 0;
                    });
                    break
                case 'а to я': 
                    state.words = state.words.sort((a, b) => {
                        if (a.translation > b.translation) {
                            return 1;
                        }
                        if (a.translation < b.translation) {
                            return -1;
                        }
                        return 0;
                    });
                    break
                case 'я to а': 
                    state.words = state.words.sort((a, b) => {
                        if (b.translation > a.translation) {
                            return 1;
                        }
                        if (b.translation < a.translation) {
                            return -1;
                        }
                        return 0;
                    });
                    break
                default:
                    state.words = state.words.sort((a, b) => b.baseForm - a.baseForm);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIrregularVerbs.pending, state => {
                state.wordsLoadingStatus = 'loading'
            })
            .addCase(fetchIrregularVerbs.fulfilled, (state, action) => {
                state.wordsLoadingStatus = 'idle';
                state.words = action.payload.sort((a, b) => {
                    if (a.baseForm > b.baseForm) {
                        return 1;
                    }
                    if (a.baseForm < b.baseForm) {
                        return -1;
                    }
                    return 0;
                });
            })
            .addCase(fetchIrregularVerbs.rejected, state => {
                state.wordsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = irregularVerbsSlice;

export default reducer;
export const {
    irregularVerbsFetching,
    irregularVerbsFetched,
    irregularVerbsFetchingError,
    setPage,
    setWordsPerUpload,
    setTotalPages,
    activeSortTypeChanged,
    sortBy
} = actions;