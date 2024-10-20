import { createSlice, createAsyncThunk } from '@redux.js/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const {reset} = goalSlice.actions

export default goalSlice.reducers