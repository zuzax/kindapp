import React, { useState }  from "react";
import firebase from "firebase";

const LoginPage = (props) => {
    const auth = firebase.auth()
    const [state, setState] = useState({
        login:"",
        password:""
    })

    const [error, setError] = useState("")

    const handleChange = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const {login, password} = state

        auth
            .signInWithEmailAndPassword(login, password)
            .then(res =>{
               setTimeout(()=>{
                props.history.push("/user/tasks")
               }, 100)
            })
            .catch(err =>{
                setError(err.message)
            })
    }

    return ( 
        <div className="tasks__container">
            <div className="form__wrapper">
            <form onSubmit={handleSubmit}>
            <h1 className="page-header_text">Login</h1>
                <input 
                    className="form__data"
                    type="email" 
                    name="login"
                    placeholder="Enter email..." 
                    onChange={handleChange} 
                    value={state.login} 
                />
                <input 
                    className="form__data"
                    type="password"
                    onChange={handleChange} 
                    name="password" 
                    placeholder="Enter password..." 
                    value={state.password} 
                />
                <button className="main-btn">Log in</button>
                {
                    error != ""?
                    <p style={{color: "red"}}>{error}</p>
                    :
                    ""
                }
            </form>
            </div>
        </div>
     );
}
 
export default LoginPage;