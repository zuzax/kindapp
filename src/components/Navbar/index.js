import React, {useContext}  from "react";
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import context from "../../contextApi/context";

const Navbar = (props) => {
    const auth = firebase.auth()
    const [contextState] = useContext(context)

    const handleClickLogout = () =>{
        auth.signOut()
    }

    return ( 
            <nav className="main-nav">
                <Link to="/" className="main-nav__link">Home</Link>
                {
                    contextState.userLogged ?
                    <>
                        <Link to="/user/tasks" className="main-nav__link">Tasks</Link>
                        <Link to="/user/addtasks" className="main-main-nav__link">Add Tasks</Link>
                        <button className="main-btn" onClick={handleClickLogout}>Logout</button>
                    </>
                    :
                    <>
                        <Link to="/login" className="main-nav__link">Login</Link>
                        <Link to="/register" className="main-nav__link">Register</Link>
                    </>
                }
                {/* <p>
                    {contextState.userLogged?
                    "Zalogowany"
                    :"Nie zalogowany"
                    }
                </p> */}
            </nav>
     );
}
 
export default Navbar;


