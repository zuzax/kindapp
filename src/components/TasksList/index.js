import React, {useState} from "react";
import TasksListItemBtnDelete from "../routes/TasksListItemBtnDelete";
import TasksListItemCheckbox from "../routes/TasksListItemCheckbox";
import TasksListItem from "../TasksListItem";

const TasksList = ({ tasks, listType }) => {
    return ( 
        <ul>
            {tasks.map((el, index) => {
              if(listType == "addTasks")
                return (
                  <TasksListItemBtnDelete
                    key={index}
                    index={index}
                    name={el}
                    handleClickDelete={() => {}}
                  />
                )
              else if(listType == "showTasks")
                return (
                  <TasksListItemCheckbox
                    key={index}
                    index={index}
                    name={el.name}
                    isChecked={el.isChecked}
                    handleCheckboxChange={() => {}}
                  />
                )
              else
                return <li>{el}</li>
            })}
        </ul>
     );
}
 
export default TasksList;