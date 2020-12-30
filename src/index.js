import React  from "react";
import ReactDOM from "react-dom";
import firebase from 'firebase'
import App from './App'
import ContextProvider from "./contextApi/ContextProvider";
import "./css/main.scss"

const firebaseConfig = {
    apiKey: "AIzaSyACNOpb1MulRRuz4EZVu8l-lE2ONxUt8Uw",
    authDomain: "kindapp-4508c.firebaseapp.com",
    projectId: "kindapp-4508c",
    storageBucket: "kindapp-4508c.appspot.com",
    messagingSenderId: "970089561639",
    appId: "1:970089561639:web:0c6806e63e494e0dba9802"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <ContextProvider>
        <App/>
    </ContextProvider>,
    document.querySelector('#root')
)