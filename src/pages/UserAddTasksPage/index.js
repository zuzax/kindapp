import React, {useEffect, useState}  from "react";
import firebase from 'firebase'
import TasksList from "../../components/TasksList"
import Alert from "../../components/Alert";


const UserAddTasksPage = (props) => {
    const firestore = firebase.firestore()
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState("")

    useEffect(()=>{
        // firestore
        //     .collection("tasks")
        //     .where("uid","==", firebase.auth().currentUser.uid)
        //     .get()
        //     .then(u =>{
        //         if(!u.empty)
        //             props.history.push("/user/tasks")
        //     })
    },[])

    const handleSubmit = e => {
        e.preventDefault();

        if(tasks.length == 5)
        {
            setError("You might not add more than 5 tasks!")
            return
        }

        setTasks([
            ...tasks,
            taskName
        ]);
        setTaskName("");
    }

    const handleChange = (e) => {
        setTaskName(e.target.value)
      };

    const handleClickSave = () =>{
        firestore
            .collection("tasks")
            .add({
                tasks,
                uid: firebase.auth().currentUser.uid
            })
            .then(()=>{
                props.history.push("/user/tasks")
            })
            .catch(err =>{
                setError("Firebase error: " + err)
            })
    }

    const handleClickDeleteTask = (index) =>{
        const updatedTasks = tasks.filter((t,i) => i !== index)
        setTasks([...updatedTasks])
    }

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <input
                className="form__data" 
                type="text"
                value={taskName}
                placeholder="Add habit"
                onChange={handleChange} />
            <button className="main-btn" type="submit">Add</button>
        </form>
        {
            error != ""?
            <Alert>
                {error}
            </Alert>
            :
            null
        }
       
        <button className="main-btn"onClick={handleClickSave}>Save</button>
        {/* <ul>
            {tasks.map((task, index) =>{
                return <li key={index}>{task}</li>
            })}
        </ul> */}
            <TasksList 
                listType="addTasks" 
                tasks={tasks} 
                handleClickDeleteTask={handleClickDeleteTask}
            />
        </div>
    )
}
 
export default UserAddTasksPage;