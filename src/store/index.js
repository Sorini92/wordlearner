import { configureStore } from "@reduxjs/toolkit";
import user from '../store/slices/userSlice';
import words from '../store/slices/wordSlice';
import irregularVerbs from '../store/slices/irregularVerbsSlice'

export const store = configureStore({
    reducer: {user, words, irregularVerbs},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production', 
});