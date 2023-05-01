import { configureStore } from "@reduxjs/toolkit";
import user from '../store/slices/userSlice';

export const store = configureStore({
    reducer: {user},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production', 
});