import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authState";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { indexSlice } from "./features/indexSlice";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    user: persistedReducer,
    [indexSlice.reducerPath]: indexSlice.reducer,
  },
  //serialize error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(indexSlice.middleware),
});
export const persistor = persistStore(store);
export default store;
