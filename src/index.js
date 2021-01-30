import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

//pass redux provider into this file
//inserts whatever content the <App/> tag (from App.js) returns into the root element 
const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
rootElement);