//TEST REDUX SLICE
import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({

    name: "timer",
    initialState: true,
    reducers: {
        changeTimer: (state) => !state,
    },
}); 

//export actions
export const { changeTimer } = timerSlice.actions;
//export reducer
export default timerSlice.reducer; 