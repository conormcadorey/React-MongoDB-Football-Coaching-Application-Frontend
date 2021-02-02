/*
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./../../redux/todoSlice";
//import TodoList from "./Test2";
import { Link, useHistory } from "react-router-dom";

export default function Test() {

  const [value, setValue] = useState("");

  //use dispatch hook to modify state in the redux store 
  const dispatch = useDispatch();

  const history = useHistory();

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch hook takes in an action
    //action is passed as first param (addTodo())
    //define payload value using 'value' var
    dispatch(addTodo(value));
    //setValue(""); //reset empty text-input 
    //redirect user to homepage 
    history.push("/test2");
  };

    return (
      <div className="page">
        <h2>REDUX TEST!</h2>
        <form onSubmit={handleSubmit}>
          <input value={value} onChange={handleChange}/>
          <button onClick={handleSubmit}>Update</button>
        </form>
        <TodoList/>

        <Link to="/test2">
            <button className="mainButton">View match</button>
            </Link>
      </div>  
    );
}

/*import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function TodoList() {
    //get todoList from redux store
    //the array contains key-value pairs
    //inside the useSelector...
    //pass in another callback function (state)
    //filter the state > then .todos (from configureStore) > then .todoList (from todoSlice)
    const todoListdata = useSelector(
        (state) => state.todos.todoList
    );

    //map the todoList data from the store
    //reference each todo key and todo value in the rendered component 
    return (
        <>
        {todoListdata.map((todo) => (
            <Box key={todo.key}>
                <Typography>Team A v {todo.value}</Typography>
            </Box>       
         ))}
        </>
    );
}
*/