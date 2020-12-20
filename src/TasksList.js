import React, {useState} from "react";

const TasksList = ({tasks}) => {
    const [tasksList, setTaskList] = useState(tasks)
    
    const handleCheckboxChange = () => {
        setTaskList(prevState => ([
            {...tasksList, 
            isChecked: !prevState.isChecked
          }]));
    }

    return ( 
        <>
        <ul>
            {tasks.map((el, index) => {
                return (
                    <>
                        <li key={index}>{el.name} 
                            <input 
                                type="checkbox" 
                                value={tasks.name} 
                                checked={tasksList.isChecked}
                                onChange={handleCheckboxChange}
                            >
                            </input>
                        </li>
                    </>
                )
            })}
        </ul>
        </>
     );
}
 
export default TasksList;