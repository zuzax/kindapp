import React  from "react";

const TasksListItemCheckbox = ({index, name, isChecked, disabled, handleCheckboxChange}) =>{
    return ( 
        <li>
            {name} 
            <input 
                type="checkbox" 
                checked={isChecked}
                disabled={disabled}
                onChange={() => handleCheckboxChange(index)}
            />
        </li>
     );
}
 
export default TasksListItemCheckbox;