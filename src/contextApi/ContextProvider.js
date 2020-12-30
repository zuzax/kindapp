import { useState } from "react";
import context from "./context";

const initialState = {
    userLogged: false
}

const ContextProvider = props => {
    const [state, setState] = useState(initialState)

    return ( 
        <context.Provider value={[state, (s) => setState({...s})]}>
            {props.children}
        </context.Provider>
     );
}
 
export default ContextProvider;