import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from '../../hooks/useGetData';

const initialState = {
    favorites: [],
    sortType: 'from new',
    letter: '',
    wordsLoadingStatus: 'loading',
    currentPage: 1,
    totalPages: 1,
    wordsPerUpload: 30
}

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchWords',
    async (id) => {
        const {request} = useGetData();
        
        const linkToWords = {
            firstUrl: 'users',
            secondUrl: id,
            thirdUrl: 'favoriteWords'
        }

        return await request(linkToWords);
    }
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        modifyWord: (state, action) => {
            state.favorites = state.favorites.map((item) => {
                if (item.id === action.payload.id) {
                    item = action.payload
                    return item
                }
                return item
            })
        },
        deleteWord: (state, action) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload)
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
                    state.favorites = state.favorites.sort((a, b) => b.date - a.date);
                    break
                case 'from old': 
                    state.favorites = state.favorites.sort((a, b) => a.date - b.date);
                    break
                case 'a to z': 
                    state.favorites = state.favorites.sort((a, b) => {
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
                    state.favorites = state.favorites.sort((a, b) => {
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
                    state.favorites = state.favorites.sort((a, b) => {
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
                    state.favorites = state.favorites.sort((a, b) => {
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
                    state.favorites = state.favorites.sort((a, b) => b.date - a.date);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, state => {
                state.wordsLoadingStatus = 'loading'
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.wordsLoadingStatus = 'idle';
                state.favorites = action.payload.sort((a, b) => b.date - a.date);
            })
            .addCase(fetchFavorites.rejected, state => {
                state.wordsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = favoritesSlice;

export default reducer;
export const {
    favoritesFetching,
    favoritesFetched,
    favoritesFetchingError,
    modifyWord,
    deleteWord,
    setPage,
    setLetter,
    setWordsPerUpload,
    setTotalPages,
    activeSortTypeChanged,
    sortBy
} = actions;