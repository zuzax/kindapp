import React  from "react";

const TasksListItemCheckbox = ({index, name, isChecked, handleCheckboxChange}) =>{
    return ( 
        <li>
            {name} 
            <input 
                type="checkbox" 
                checked={isChecked}
                onChange={() => handleCheckboxChange(index)}
            />
        </li>
     );
}
 
export default TasksListItemCheckbox;