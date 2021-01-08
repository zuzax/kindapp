import React, {useEffect, useState}  from "react";
import firebase from 'firebase'
import TasksList from "../../components/TasksList"
import Alert from "../../components/Alert";
// import {ReactComponent as Tree} from '../../img/tree.svg'; 


const UserAddTasksPage = (props) => {
    const firestore = firebase.firestore()
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState("")

    useEffect(()=>{
        firestore
            .collection("tasks")
            .where("uid","==", firebase.auth().currentUser.uid)
            .get()
            .then(u =>{
                if(!u.empty)
                    props.history.push("/user/tasks")
            })
    },[])

    const handleSubmit = e => {
        e.preventDefault();

        if(tasks.length === 5)
        {
            setError("You cannot add more than 5 tasks!")
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
                setError(err)
            })
    }

    const handleClickDeleteTask = (index) =>{
        const updatedTasks = tasks.filter((t,i) => i !== index)
        setTasks([...updatedTasks])
    }

    return (
        <>
        <div className="container">
            <div className="form__wrapper">
                <h1 className="page-header_text">Add habbits to improve:</h1>
            <form className ="form__form" onSubmit={handleSubmit}>
                <input
                    className="form__data" 
                    type="text"
                    value={taskName}
                    placeholder="Add habit"
                    onChange={handleChange} />
                <button className="add-btn" type="submit">Add</button>
            </form>
            {
                error != ""?
                <Alert>
                    {error}
                </Alert>
                :
                null
            }
                <TasksList 
                    listType="addTasks" 
                    tasks={tasks} 
                    handleClickDeleteTask={handleClickDeleteTask}
                />
                {
                    tasks.length > 0 ?
                        <button className="main-btn"onClick={handleClickSave}>Save</button>
                        :
                        null
                }
            </div>
        </div>
        </>
    )
}
 
export default UserAddTasksPage;