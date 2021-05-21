import React, { useContext } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// custom route component 
//pass authentication check , the component, and anything else as props 
const ProtectedRoute = ({ component: Comp, path, ...rest }) => {

    const { userData } = useContext(UserContext);
    const history = useHistory();

    return (
      <Route path={path} {...rest} 
      render={props => {  
         return userData.isLoggedIn ? (<Comp {...props} />) : (userData.isLoading ? 
          <div>
          <CircularProgress/>
          <Button 
            variant="contained"
            m={10}
            style={{margin: "auto", display: "flex"}}
            disableElevation
            onClick={() => history.push("/login")}
          >
              Login 
          </Button></div>: <Redirect to="/login" />)
        }}
      />
    );
  };
  
  export default ProtectedRoute;


/*
export default function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {

    return <Route {...rest} render={(props) => {
        if (isAuth) {
            return <Component />
        } else {
            return <Redirect to={{pathname: "/login", state: { from: props.location }}}/>
        }
    }}/>
}
*/