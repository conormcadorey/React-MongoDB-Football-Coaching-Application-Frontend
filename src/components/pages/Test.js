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
