import React  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const TasksListItemBtnDelete = ({index, name, handleClickDelete}) =>{
    return ( 
        <li>
            {name} 
            <button onClick={() => handleClickDelete(index)} className="btn__delete">
            X
            </button>
        </li>
     );
}
 
export default TasksListItemBtnDelete;