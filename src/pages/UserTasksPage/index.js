import React, {useEffect, useState}  from "react";
import firebase from 'firebase'

const UserTasksPage = () => {
    const firestore = firebase.firestore()
    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        firestore
            .collection("tasks")
            .where("uid", "==", firebase.auth().currentUser.uid)
            .get()
            .then(d =>{
                console.log(d.docs)
                const docs = d.docs.map(o => o.data())
                console.log(docs)
            })
    }, [])
   
    return (
        <>
        <h1>UserTasksPage</h1>
        </>
    )
}    

export default UserTasksPage;