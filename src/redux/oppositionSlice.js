import { createSlice, nanoid } from "@reduxjs/toolkit";

export const oppositionSlice = createSlice({
    name: "opposition",
    initialState: {
        oppositionName: [],
    },
    reducers: {
        addOpposition: { 
            reducer: (state, action) => {
            state.oppositionName.push(action.payload);
        },
        //nanoID generates a random id as they array item key
        //the payload is then pushed to the state in the above reducer
        prepare(value) {
            return {
                payload: {
                    key: nanoid(),
                    value: value,
                },
            };
        },
    },
},
}); 

//export actions
export const { addOpposition } = oppositionSlice.actions;
//export reducer
export default oppositionSlice.reducer; 