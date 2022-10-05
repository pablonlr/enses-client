import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {wordsInSpanish} from "../services/wordsInSpanish"

export default configureStore({
    reducer: {
        [wordsInSpanish.reducerPath]: wordsInSpanish.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(wordsInSpanish.middleware)
});