import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface PopUpState {
	error: {
		heading: string,
		text: string,
	},
	success: {
		heading: string,
		text: string,
	},
	loading: {
		heading: string,
		text: string,
	}
}

const initialState: PopUpState = {
	error: {
		heading: '',
		text: '',
	},
	success: {
		heading: '',
		text: '',
	},
	loading: {
		heading: '',
		text: '',
	}
}

const popUpSlice = createSlice({
	initialState,
	name: 'popUp',
	reducers: {
		setPopUpError: (state, action: PayloadAction<{ heading: string, text: string }>) => {
			state.error.heading = action.payload.heading
			state.error.text = action.payload.text
		},
		setPopUpSuccess: (state, action: PayloadAction<{ heading: string, text: string }>) => {
			state.success.heading = action.payload.heading
			state.success.text = action.payload.text
		},
		setPopUpLoading: (state, action: PayloadAction<{ heading: string, text: string }>) => {
			state.loading.heading = action.payload.heading
			state.loading.text = action.payload.text
		}
	}
})

export const { setPopUpError, setPopUpSuccess, setPopUpLoading } = popUpSlice.actions
export default popUpSlice.reducer