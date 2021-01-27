import React from "react";

//returns something from props
export default function ErrorNotice(props) {
    return (
    <div className="error-notice">
        <span>{props.message}</span>
        <button onClick={props.clearError}>X</button> 
    </div>
    );
}