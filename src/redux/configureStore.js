import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import oppositionReducer from "./oppositionSlice";

//create a combine reducers var if using multiple slices
//all reducers can be put in here and then passed into the store for export
const reducer = combineReducers({
    //todos: todoReducer,
    opposition: oppositionReducer,
});

//store is the default export 
const store = configureStore({
    reducer
});

export default store;


