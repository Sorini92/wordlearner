/* import { configureStore } from "@reduxjs/toolkit";
import user from '../store/slices/userSlice';
import words from '../store/slices/wordSlice';
import irregularVerbs from '../store/slices/irregularVerbsSlice';
import favorites from '../store/slices/favoritesSlice';
import sentences from '../store/slices/sentencesSlice';

export const store = configureStore({
    reducer: {user, words, irregularVerbs, favorites, sentences},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production', 
}); */

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { 
	persistStore, 
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER, 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from '../store/slices/userSlice';
import words from '../store/slices/wordSlice';
import irregularVerbs from '../store/slices/irregularVerbsSlice';
import favorites from '../store/slices/favoritesSlice';
import sentences from '../store/slices/sentencesSlice';

const wordsPersistConfig = {
    key: 'words',
    storage: storage,
    blacklist: ['words', 'wordsLoadingStatus', 'totalPages']
}

const favoritesPersistConfig = {
    key: 'favorites',
    storage: storage,
    blacklist: ['favorites', 'wordsLoadingStatus', 'totalPages']
}

const irregularVerbsPersistConfig = {
    key: 'irregularVerbs',
    storage: storage,
    blacklist: ['verbs', 'wordsLoadingStatus', 'totalPages']
}

const sentencesPersistConfig = {
    key: 'sentences',
    storage: storage,
    blacklist: ['sentences', 'sentencesLoadingStatus', 'totalPages']
}

const rootReducer = combineReducers({
    words: persistReducer(wordsPersistConfig, words),
    favorites: persistReducer(favoritesPersistConfig, favorites),
    irregularVerbs: persistReducer(irregularVerbsPersistConfig, irregularVerbs),
    sentences: persistReducer(sentencesPersistConfig, sentences),
    user
})

//const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	//reducer: persistedReducer,
    reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
	devTools: process.env.NODE_ENV !== 'production', 
})

export const persistor = persistStore(store);

export default store;