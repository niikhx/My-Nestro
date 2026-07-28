import { configureStore } from '@reduxjs/toolkit'
import  CartSlice  from './features/cartSlice'

export const store = configureStore({
  reducer: {
    cart:CartSlice
  },
})