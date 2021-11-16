import React, { useContext, useEffect }  from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import firebase from 'firebase'
import context from "./contextApi/context";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PublicRoute from "./components/routes/PublicRoute";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedeRoute from "./components/routes/ProtectedRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import UserTasksPage from "./pages/UserTasksPage";
import UserAddTasksPage from "./pages/UserAddTasksPage";
import Navbar from "./components/Navbar";

const App = () => {
    // const auth = firebase.auth()
    // const [contextState, setContextState] = useContext(context)

    // useEffect(() =>{
    //     auth.onAuthStateChanged((user) =>{
    //         if(user){
    //             setContextState({
    //                 ...contextState,
    //                 userLogged: true
    //             })
    //         }else{
    //             setContextState({
    //                 ...contextState,
    //                 userLogged: false
    //             })
    //         }
    //     })
    // }, [])

    
    return (
        <Router>
            <Navbar />
            <Switch>
                <PublicRoute exact path="/" component={HomePage} />
                <ProtectedeRoute exact path="/login" component={LoginPage} passLoggedUsers={false} />
                <ProtectedeRoute exact path="/register" component={RegisterPage} passLoggedUsers={false} />
                <PrivateRoute exact path="/user/tasks" component={UserTasksPage} />
                <PrivateRoute exact path="/user/addtasks" component={UserAddTasksPage} />
                <PublicRoute component={NotFoundPage} />
            </Switch>
        </Router>
    )
};

export default App