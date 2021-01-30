import { combineReducers, createStore } from "redux";
import oppTitleReducer from "./ducks/oppTitle";

const reducer = combineReducers({
    oppName: oppTitleReducer
});

const store = createStore(reducer);

export default store;