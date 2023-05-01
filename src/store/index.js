import { configureStore } from "@reduxjs/toolkit";
import user from '../store/slices/userSlice';
import words from '../store/slices/wordSlice';

export const store = configureStore({
    reducer: {user, words},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production', 
});