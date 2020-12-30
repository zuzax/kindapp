import React, {useContext}  from "react";
import {Route, Redirect} from 'react-router-dom'
import context from "../../../contextApi/context";

const PrivateRoute = (props) => {
    const [contextState] = useContext(context)

    return ( 
        <>
        {
            contextState.userLogged ?
                <Route {...props} />
                :
                <Redirect
                    to="/"
                />
        }
        </>
     );
}
 
export default PrivateRoute;