import {rootReducer} from "./rootReducers";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})
