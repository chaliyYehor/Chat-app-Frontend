import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ToolsSliceType {
	areOpen: boolean
}

const initialState: ToolsSliceType = {
	areOpen: false,
}

const toolsSlice = createSlice({
	name: 'tools',
	initialState,
	reducers: {
		setToolsState: (state, action: PayloadAction<boolean>) => {
			state.areOpen = action.payload
		},
	},
})

export const { setToolsState } = toolsSlice.actions
export default toolsSlice.reducer
