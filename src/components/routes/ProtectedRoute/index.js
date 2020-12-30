import React, {useContext}  from "react";
import {Route, Redirect} from 'react-router-dom'
import context from "../../../contextApi/context";

const ProtectedeRoute = (props) => {
    const [contextState] = useContext(context)

    return ( 
        <>
        {
            !contextState.userLogged || (contextState.userLogged && props.passLoggedUsers) ?
                <Route {...props} />
                :
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
        }
        </>
     );
}
 
export default ProtectedeRoute;