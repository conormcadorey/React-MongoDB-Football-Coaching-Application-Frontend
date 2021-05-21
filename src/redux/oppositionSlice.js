import { createSlice } from "@reduxjs/toolkit";

export const oppositionSlice = createSlice({
    name: "opposition",
    initialState: {
        oppositionName: "",
        homeAway: true,
    },
    reducers: {
        addOpposition: { 
            reducer: (state, action) => {
            state.oppositionName = action.payload;
            },
        },
        addHomeAway: { 
            reducer: (state, action) => {
            state.homeAway = action.payload;
            },
        },
},
}); 

//export actions
export const { addOpposition, addHomeAway } = oppositionSlice.actions;
//export reducer
export default oppositionSlice.reducer; 