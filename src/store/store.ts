import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import socketReducer from './slices/socketSlice'
export const store = configureStore({
	reducer: {
		theme: themeReducer,
		socketState: socketReducer,
	},
})

export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
