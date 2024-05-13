import { createSlice } from '@reduxjs/toolkit'

export const StatusSlice = createSlice({
    name: "StatusSlice",
    initialState: {
        isLoading: false
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const {setIsLoading} = StatusSlice.actions;
export default StatusSlice.reducer;