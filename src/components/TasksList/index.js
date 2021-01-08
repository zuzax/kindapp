import React, {useState} from "react";
import TasksListItemBtnDelete from "../routes/TasksListItemBtnDelete";
import TasksListItemCheckbox from "../routes/TasksListItemCheckbox";
import TasksListItem from "../TasksListItem";

const TasksList = ({ tasks, listType, handleClickDeleteTask = () => {}, handleCheckboxChangeTask = () =>{} }) => {
    return ( 
        <ul>
            {tasks.map((el, index) => {
              if(listType === "addTasks")
                return (
                  <TasksListItemBtnDelete
                    key={index}
                    index={index}
                    name={el}
                    handleClickDelete={handleClickDeleteTask}
                  />
                )
              else if(listType === "showTasks")
                return (
                  <TasksListItemCheckbox
                    key={index}
                    index={index}
                    name={el.name}
                    isChecked={el.isChecked}
                    disabled={el.disabled}
                    handleCheckboxChange={handleCheckboxChangeTask}
                  />
                )
              else
                return <li className="tasks__task-item">{el}</li>
            })}
        </ul>
     );
}
 
export default TasksList;