import React  from "react";

const TasksListItemBtnDelete = ({index, name, handleClickDelete}) =>{
    return ( 
        <li>
            {name} 
            <button onClick={() => handleClickDelete(index)}>
                Delete
            </button>
        </li>
     );
}
 
export default TasksListItemBtnDelete;