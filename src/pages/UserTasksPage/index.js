import React, {useEffect, useState}  from "react";
import firebase from 'firebase'
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import TasksList from "../../components/TasksList";
import DailyProgressBar from "../../DailyProgressBar";

const UserTasksPage = () => {
    const firestore = firebase.firestore()
    const [tasks, setTasks] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleCheckboxChangeTask = (index) =>{
        const updatedTasks = tasks.map((task, i)=>{
            if(i === index)
                return {...task, isChecked: !task.isChecked}
            return task
        })
        setTasks([...updatedTasks])



        console.log(selectedDate.toLocaleDateString())
        firestore
            .collection("completedTasks")
            .where("date", "==", selectedDate.toLocaleDateString())
            .where("uid", "==", firebase.auth().currentUser.uid)
            .get()
            .then(d =>{
                // jeśli istnieje dokument w kolekcji "completedTasks" dla danego dnia i użytkownika
                // to pobieramy ten dokument i go aktualizujemy
                if(d.docs.length > 0)
                {
                    const doc = d.docs[0];
                    const tasksCheck  = updatedTasks.map(t => t.isChecked)
                    firestore
                        .collection("completedTasks")
                        .doc(doc.id)
                        .update({
                            tasks: tasksCheck
                        })
                }
                // jeśli nie istnieje dokument w kolekcji "completedTasks" dla danego dnia i użytkownika
                // to tworzymy nowy dokument
                else
                {
                    const tasksCheck  = updatedTasks.map(t => t.isChecked)
                    firestore
                        .collection("completedTasks")
                        .add({
                            uid: firebase.auth().currentUser.uid,
                            date: selectedDate.toLocaleDateString(),
                            tasks: tasksCheck
                        })
                }
            })
    }


    useEffect(()=>{
        // firestore
        // .collection("completedTasks")
        // // .where("id", "==", "0ff3286dbe5RrT9nflRl")
        // .get()
        // .then(d =>{
        //     const doc = d.docs.map(o => o.data())[0]
        //     console.log(doc.tasks["nie pic"])
    
        // })
        firestore
            .collection("tasks")
            .where("uid", "==", firebase.auth().currentUser.uid)
            .get()
            .then(d =>{
                const doc = d.docs.map(o => o.data())[0]
                if(doc)
                {
                    const tasksObjs = prepareTasks(doc)
                    setTasks([...tasksObjs])

                    firestore
                    .collection("completedTasks")
                    .where("date", "==", selectedDate.toLocaleDateString())
                    .where("uid", "==", firebase.auth().currentUser.uid)
                    .get()
                    .then(d =>{
                        const doc = d.docs.map(o => o.data())[0]
                        if(doc)
                        {
                            const updatedTasks = tasksObjs.map((t, i) => {
                                return {...t, isChecked: doc.tasks[i]}
                            })
                            setTasks(updatedTasks)
                        }
                    })
                }
            })
    }, [])


    useEffect(() =>{
        firestore
        .collection("tasks")
        .where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then(d =>{
            const doc = d.docs.map(o => o.data())[0]
            if(doc)
            {
                const tasksObjs = prepareTasks(doc)
                setTasks([...tasksObjs])

                firestore
                .collection("completedTasks")
                .where("date", "==", selectedDate.toLocaleDateString())
                .where("uid", "==", firebase.auth().currentUser.uid)
                .get()
                .then(d =>{
                    const doc = d.docs.map(o => o.data())[0]
                    if(doc)
                    {
                        const updatedTasks = tasksObjs.map((t, i) => {
                            return {...t, isChecked: doc.tasks[i]}
                        })
                        setTasks(updatedTasks)
                    }
                })
            }
        })
    },[selectedDate])

    const prepareTasks = (doc, d) =>{
        const tasksObjs = doc.tasks.map(name =>{
            return {name, 
                isChecked: false, 
                disabled: new Date().toLocaleDateString() == selectedDate.toLocaleDateString() ? false: true
            }
        })
        return tasksObjs
    }

    const handleCalendarDateChange = (date) =>{
        setSelectedDate(date)
    }

    const calculateDidTasksPercent = () =>{
        let numOfDidTasks = 0
        tasks.forEach(t => {
            if(t.isChecked)
                numOfDidTasks++ 
            })
        return (numOfDidTasks/tasks.length) * 100
    }
   
    return (
        <>
        <div className="tasks__container">
            <div className="tasks__el-container">
                <DailyProgressBar 
                    trailStrokeColor="#9877e8"
                    strokeColor="#ff8084"
                    percentage={calculateDidTasksPercent()} 
                />
                <TasksList
                    tasks={tasks}
                    listType="showTasks"
                    handleCheckboxChangeTask={handleCheckboxChangeTask}
                />
            </div>
            <div className="tasks__el-container">
                <Calendar
                    defaultActiveStartDate={new Date()}
                    maxDate={new Date()}
                    onChange={handleCalendarDateChange}
                    value={selectedDate}
                />
            </div>
            </div>
        </>
    )
}    

export default UserTasksPage;