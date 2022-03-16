import { configureStore } from '@reduxjs/toolkit'
import Reducer from "../store/reducer.js"

export const store = configureStore({
  reducer: {
      edvora: Reducer,
  },
})