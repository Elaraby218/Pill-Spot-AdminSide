// src/app/store.ts
import LangSlice from "../Featurs/Lang/lang";
import authLoginSlice from "../Featurs/AuthLogin/auth";
import curUserSlice from "../Featurs/User/CurUser";
import ThemeSlice from "../Featurs/Theme/theme";
import pharmacySlice from "../Featurs/pharmacy/getAll";
import editPharmacySlice from "../Featurs/pharmacy/editPhar";
import pharmacyEmployeesSlice from "../Featurs/pharmacy/getPharEmps";
import categorySlice from "../Featurs/category/categorySlice";
import { productReducer } from "../Featurs/product";
import pharmacyRequestsReducer from "../Featurs/pharmacy/pharmacyRequestsSlice";
import usersReducer from "../Featurs/User/usersSlice";
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import notificationSlice from "../Featurs/Notification/notificationSlice";
import manageNotificationReducer from "../Featurs/manageNotification/ManageNotifySlice";

import {
  persistReducer,
  persistStore,
  PersistConfig,
} from 'redux-persist'

import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';

const authPersistConfig: PersistConfig<ReturnType<typeof curUserSlice>> = {
  key: 'authCurUser',
  storage: storageSession,
}
const themePersistConfig: PersistConfig<ReturnType<typeof ThemeSlice>> = {
  key: 'theme',
  storage: storage,
}

const persistedCurUserReducer = persistReducer(authPersistConfig, curUserSlice)
const persistedThemeReducer = persistReducer(themePersistConfig, ThemeSlice)

const rootReducer = combineReducers({
  langSlice: LangSlice,
  authLoginSlice: authLoginSlice,
  curUserSlice: persistedCurUserReducer,
  ThemeSlice: persistedThemeReducer,
  pharmacySlice: pharmacySlice,
  editPharmacySlice: editPharmacySlice,
  pharmacyEmployeesSlice: pharmacyEmployeesSlice,
  categorySlice: categorySlice,
  product: productReducer,
  pharmacyRequests: pharmacyRequestsReducer,
  users: usersReducer,
  notifications: notificationSlice,
  manageNotification: manageNotificationReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
