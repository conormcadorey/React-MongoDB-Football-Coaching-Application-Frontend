//TEST REDUX SLICE
import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    //takes 3 things:
    //name, initialState, reducers
    //name- what we call the createSlice
    //initialstate- set up the initial state (eg- an empty array)
    name: "todos",
    initialState: {
        todoList: [],
    },
    //reducer takes a state and action object
    //state in redux is suposed to be immutable...
    //redux uses immer to handle data mutability
    reducers: {
        addTodo: { 
            reducer: (state, action) => {
            //push the acton.payload data into the todoList state object
            state.todoList.push(action.payload);
        },
        //can add other fields to payload by using a prepare callback
        //add key to each todo
        //takes a value passed in from dispatch 
        //creates a payload from thus value 
        //nanoID generates a random id 
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
export const { addTodo } = todoSlice.actions;
//export reducer
export default todoSlice.reducer; 

/*
import { createSlice } from "@reduxjs/toolkit";

export const oppositionSlice = createSlice({
    name: "oppositionName",
    initialState: {
        name: null,
    },
    reducers: {
        createOpposition: (state, action) => {
            state.name = action.payload;
        },
        resetOpposition: (state) => {
            state.name = null;
        },
    },
});

//export function(s)
export const { createOpposition, resetOpposition } = oppositionSlice.actions;

//this function is known as a selector
//allows us to select a value from the state object
export const selectOpposition = (state) => state.name.name;

export default oppositionSlice.reducer;
*/