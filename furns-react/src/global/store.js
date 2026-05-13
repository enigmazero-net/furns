import {PREFIX} from "@utils/constant";
import {rootReducer} from "./rootReducers";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {persistReducer, persistStore} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";

const createNoopStorage = () => ({
    getItem() {
        return Promise.resolve(null);
    },
    setItem(_key, value) {
        return Promise.resolve(value);
    },
    removeItem() {
        return Promise.resolve();
    },
});

const storage = typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
    key: `${PREFIX}-furns`,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
        },
    }),
    devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store);
