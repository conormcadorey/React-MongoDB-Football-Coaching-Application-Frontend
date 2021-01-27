import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//inserts whatever content the <App/> tag (from App.js) returns into the root element 
ReactDOM.render(<App />, document.querySelector("#root"));