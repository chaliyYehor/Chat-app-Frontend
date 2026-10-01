import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ThemeState {
	mode: 'light' | 'dark'
}

const initialState: ThemeState = {
	mode: 'dark',
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, payload: PayloadAction<'light' | 'dark'>) => {
			state.mode = payload.payload
		}
	}
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer