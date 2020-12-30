import React, { useState }  from "react";
import firebase from "firebase";

const LoginPage = () => {
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

        auth.signInWithEmailAndPassword(login, password)
            .then(res =>{
                alert("logged")
            })
            .catch(err =>{
                setError(err.message)
            })
    }

    return ( 
        <div>
            <h1>Register</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <input type="text" name="login" onChange={handleChange} value={state.login} />
                <input type="password" onChange={handleChange} name="password" value={state.password} />
                <button>Zaloguj</button>
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
 
export default LoginPage;