import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from '../../hooks/useGetData';

const initialState = {
    words: [],
    sortType: 'date',
    wordsLoadingStatus: 'loading',
    currentPage: 1,
    totalPages: 1,
    wordsPerUpload: 35
}

export const fetchWords = createAsyncThunk(
    'words/fetchWords',
    async () => {
        const {request} = useGetData();
        const linkToWords = {
            firstUrl: 'users',
            secondUrl: 'user1',
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
                    item = action.payload
                    return item
                }
                return item
            })
        },
        deleteWord: (state, action) => {
            state.words = state.words.filter(item => item.id !== action.payload)
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
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
    setPage,
    setTotalPages,
    activeSortTypeChanged,
    sortBy
} = actions;