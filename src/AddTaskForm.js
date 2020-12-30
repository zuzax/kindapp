import React,  {useState} from "react";
import TasksList from "./components/TasksList"

const AddTaskForm = () => {
    const [userInput, setUserInput] = useState("");
    const [tasks, setTasks] = useState([])

    const submit = e => {
        e.preventDefault();
        setTasks([
            ...tasks,
            {
                id: tasks.length,
                name: userInput,
                isChecked: false
            }
        ]);
        setUserInput("");
    }

    const change = (e) => {
        setUserInput(e.target.value)
      };


    return (
        <>
        <form onSubmit={submit}>
            <input 
                type="text"
                value={userInput}
                placeholder="Add habit"
                onChange={change} />
            <button type="submit">Proceed</button>
        </form>
        <TasksList tasks={tasks} />
        </>
    )
   }     

   export default AddTaskForm;