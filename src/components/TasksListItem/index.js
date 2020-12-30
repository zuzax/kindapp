import React  from "react";

const TasksListItem = ({
    name,
    isChecked, id, handleCheckboxChange = () =>{}, checkboxVisible, deleteVisible, }) => {
    return ( 
        <>
        <li>
            {name} 
            <input 
                type="checkbox" 
                value={name} 
                checked={isChecked}
                onChange={() => handleCheckboxChange(id)}
            />
        </li>
    </>
     );
}
 
export default TasksListItem;