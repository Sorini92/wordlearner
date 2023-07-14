import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from '../../hooks/useGetData';

const initialState = {
    sentences: [],
    sortType: 'from new',
    sentencesLoadingStatus: 'loading',
    currentPage: 1,
    totalPages: 1,
    sentencesPerUpload: 10
}

export const fetchSentences = createAsyncThunk(
    'sentences/fetchSentences',
    async (id) => {
        const {request} = useGetData();
        
        const linkToSentences = {
            firstUrl: 'users',
            secondUrl: id,
            thirdUrl: 'sentences'
        }

        return await request(linkToSentences);
    }
);

const sentencesSlice = createSlice({
    name: 'sentences',
    initialState,
    reducers: {
        addSentence: (state, action) => {
            state.sentences.unshift(action.payload)
        },
        modifySentence: (state, action) => {
            state.sentences = state.sentences.map((item) => {
                if (item.id === action.payload.id) {
                    item = action.payload;
                    return item
                }
                return item
            })
        },
        deleteSentence: (state, action) => {
            state.sentences = state.sentences.filter(item => item.id !== action.payload)
        },
        deleteSentences: (state, action) => {
            state.sentences = state.sentences.filter(item => !action.payload.includes(item.id));
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setSentencesPerUpload: (state, action) => {
            state.sentencesPerUpload = action.payload;
        },
        activeSortTypeChanged: (state, action) => {state.sortType = action.payload},
        sortBy: (state, action) => {
            switch(action.payload) {
                case 'from new': 
                    state.sentences = state.sentences.sort((a, b) => b.date - a.date);
                    break
                case 'from old': 
                    state.sentences = state.sentences.sort((a, b) => a.date - b.date);
                    break
                default:
                    state.sentences = state.sentences.sort((a, b) => b.date - a.date);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSentences.pending, state => {
                state.sentencesLoadingStatus = 'loading'
            })
            .addCase(fetchSentences.fulfilled, (state, action) => {
                state.sentencesLoadingStatus = 'idle';
                state.sentences = action.payload.sort((a, b) => b.date - a.date);
            })
            .addCase(fetchSentences.rejected, state => {
                state.sentencesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = sentencesSlice;

export default reducer;
export const {
    addSentence,
    modifySentence,
    deleteSentence,
    deleteSentences,
    setPage,
    setSentencesPerUpload,
    setTotalPages,
    activeSortTypeChanged,
    sortBy
} = actions;