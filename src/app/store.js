import {configureStore } from '@reduxjs/toolkit'
import {wordsInSpanish} from "../services/wordsInSpanish"

export default configureStore({
    reducer: {
        [wordsInSpanish.reducerPath]: wordsInSpanish.reducer,
    },
})