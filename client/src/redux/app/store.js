import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk";

import PreferencesSlice from "../features/PreferencesSlice"
import UserSlice from "../features/UserSlice";

const reducers = combineReducers({
    PreferencesSlice,
    UserSlice
});

const persistConfig = {
    key: "root",
    timeout: 100,
    storage,
    whitelist: ["PreferencesSlice", "UserSlice"]
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [thunk]
})
export const persistor = persistStore(store)