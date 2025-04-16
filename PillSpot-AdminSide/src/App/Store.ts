// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import  LangSlice  from '../Featurs/Lang/lang'


export const store = configureStore({
  reducer: {
    langSlice : LangSlice ,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
