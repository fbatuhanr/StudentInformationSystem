import { createSlice } from '@reduxjs/toolkit'

export const PreferencesSlice = createSlice({
    name: "PreferencesSlice",
    initialState: {
        preferences: {
            "theme": null
        },
    },
    reducers: {
        setPreferences: (state, action) => {
            state.preferences = action.payload;
        },
        clearPreferences: (state, action) => {
            state.preferences = {};
        }
    }
});

export const {setPreferences, clearPreferences} = PreferencesSlice.actions;
export default PreferencesSlice.reducer;