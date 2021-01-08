import React, { useState }  from "react";
import firebase from "firebase";

const RegisterPage = (props) => {
    const auth = firebase.auth()
    const [state, setState] = useState({
        login:"",
        password:"",
        reppassword:""
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
        const {login, password, reppassword} = state

        if(password != reppassword)
        {
            setError("Passwords does not match")
            return
        }

        auth
            .createUserWithEmailAndPassword(login, password)
            .then(res =>{
                props.history.push("/user/addtasks")
            })
            .catch(err =>{
                setError(err.message)
            })
    }

    return ( 
        <div className="container">
            <form onSubmit={handleSubmit}>
            <h1 className="page-header_text">Register</h1>
                    <input 
                        className="form__data"
                        type="email" 
                        name="login" 
                        placeholder="enter email" 
                        onChange={handleChange} 
                        value={state.login} 
                    />
                    <input 
                        className="form__data"
                        type="password"
                        name="password"
                        placeholder="enter password" 
                        onChange={handleChange} 
                        value={state.password} 
                    />
                    <input 
                        className="form__data"
                        type="password"
                        placeholder="repeat password" 
                        onChange={handleChange}
                        name="reppassword" 
                        value={state.reppassword} 
                    />
                <button className="main-btn">Register</button>
                {
                    error != ""?
                    <p style={{color: "red"}}>{error}</p>
                    :
                    ""
        
                }
            </form>
        </div>
     );
}
 
export default RegisterPage;