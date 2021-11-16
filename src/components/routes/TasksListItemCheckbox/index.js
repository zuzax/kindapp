import React  from "react";

const TasksListItemCheckbox = ({index, name, isChecked, disabled, handleCheckboxChange}) =>{
    return ( 
        <li>
            {name} 
            <input 
                type="checkbox" 
                checked={isChecked}
                disabled={disabled}
                style={{float: "right", marginTop: -2}}
                onChange={() => handleCheckboxChange(index)}
            />
        </li>
     );
}
 
export default TasksListItemCheckbox;