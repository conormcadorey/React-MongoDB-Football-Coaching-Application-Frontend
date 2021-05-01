import { createSlice } from "@reduxjs/toolkit";

export const oppositionSlice = createSlice({
    name: "opposition",
    initialState: {
        oppositionName: "",
    },
    reducers: {
        addOpposition: { 
            reducer: (state, action) => {
            state.oppositionName = action.payload;
        },
    },
},
}); 

//export actions
export const { addOpposition } = oppositionSlice.actions;
//export reducer
export default oppositionSlice.reducer; 