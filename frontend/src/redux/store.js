import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import sideToggleSlice from "./slices/sideToggle";
import userSlice from "./slices/user";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    sideToggle: sideToggleSlice,
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;
