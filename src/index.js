import React  from "react";
import ReactDOM from "react-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import AddTaskForm from "./AddTaskForm";
import DailyProgressBar from "./DailyProgressBar"



const App = () => {
    
    return (
        <>
            <AddTaskForm />  
            <DailyProgressBar
                trailStrokeColor="#9877E8"
                strokeColor="#FF8084"
                percentage={10}
                innerText="complete" />
            <Calendar />        
        </>
    )
};

ReactDOM.render(
    <App/>,document.querySelector('#root')
)