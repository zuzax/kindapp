import React, { useState }  from "react";
import firebase from "firebase";

const RegisterPage = () => {
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
                alert("registered")
            })
            .catch(err =>{
                setError(err.message)
            })
    }

    return ( 
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                    <input 
                        className="form__data"
                        type="text" 
                        name="login" 
                        placeholder="enter login" 
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
                <button className="form__btn">Register</button>
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