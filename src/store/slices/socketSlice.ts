import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface socketSliceState {
	globalSocketError: string | null
	isSocketConnected: boolean
}

const initialState: socketSliceState = {
	globalSocketError: null,
	isSocketConnected: false,
}

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setGlobalSocketError: (state, payload: PayloadAction<string | null>) => {
			state.globalSocketError = payload.payload
		},
		setIsSocketConnected: (state, payload: PayloadAction<boolean>) => {
			state.isSocketConnected = payload.payload
		}
	}
})

export const { setGlobalSocketError, setIsSocketConnected } = socketSlice.actions
export default socketSlice.reducer