import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk";

import StatusSlice from "../features/StatusSlice"
import UserSlice from "../features/UserSlice";

const reducers = combineReducers({
    StatusSlice,
    UserSlice
});

const persistConfig = {
    key: "root",
    timeout: 100,
    storage,
    whitelist: ["StatusSlice", "UserSlice"]
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [thunk]
})
export const persistor = persistStore(store)