import { configureStore } from "@reduxjs/toolkit";
import user from '../store/slices/userSlice';
import words from '../store/slices/wordSlice';
import irregularVerbs from '../store/slices/irregularVerbsSlice';
import favorites from '../store/slices/favoritesSlice';
import sentences from '../store/slices/sentencesSlice';

export const store = configureStore({
    reducer: {user, words, irregularVerbs, favorites, sentences},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production', 
});