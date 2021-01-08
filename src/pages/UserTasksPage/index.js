import React, {useEffect, useState}  from "react";
import firebase from 'firebase'
import Calendar from 'react-calendar';
import TasksList from "../../components/TasksList";
import DailyProgressBar from "../../DailyProgressBar";

const UserTasksPage = (props) => {
    const firestore = firebase.firestore()
    const [tasks, setTasks] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [percent, setPercent] = useState(0)
    const [url, setUrl] = useState("")

    // zmiana state dla chechkboxa
    const handleCheckboxChangeTask = (index) =>{
        const updatedTasks = tasks.map((task, i)=>{
            if(i === index)
                return {...task, isChecked: !task.isChecked}
            return task
        })
        setTasks([...updatedTasks])

            // zapis do firestore zadan odznaczonych na dany dzien
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
                // tworzy sie nowy dokument
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

            // calculateDidTasksPercentPerMonth()
            // .then(p => {
            //     setPercent(p)
            // })
    }
    // generowanie randomowego cytatu
    const randomQuote =  Math.floor(Math.random() * (1643 - 1)) + 1;
    useEffect(() => {
        fetch("https://type.fit/api/quotes")
        .then(resp => resp.json())
        .then(q => {
            setUrl(q[randomQuote].text);
        })
        .catch(err => {
            console.error(err);
        });
        // fetch("https://api.thecatapi.com/v1/images/search")
        // .then(resp => resp.json())
        // .then(data => {
        //     setUrl(data[0].url)          
        // })
    }, [])
    //

    useEffect(()=>{
        firestore
            .collection("tasks")
            .where("uid", "==", firebase.auth().currentUser.uid)
            .get()
            .then(d =>{
                const doc = d.docs.map(o => o.data())[0]
                console.log(doc)
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

                    // calculateDidTasksPercentPerMonth()
                    //     .then(p => {
                    //         setPercent(p)
                    //     })
                }
                else{
                    props.history.push("/user/addtasks")
                }
            })
    }, [selectedDate])


    // useEffect(() =>{
    //     firestore
    //     .collection("tasks")
    //     .where("uid", "==", firebase.auth().currentUser.uid)
    //     .get()
    //     .then(d =>{
    //         const doc = d.docs.map(o => o.data())[0]
    //         if(doc)
    //         {
    //             const tasksObjs = prepareTasks(doc)
    //             setTasks([...tasksObjs])

    //             firestore
    //             .collection("completedTasks")
    //             .where("date", "==", selectedDate.toLocaleDateString())
    //             .where("uid", "==", firebase.auth().currentUser.uid)
    //             .get()
    //             .then(d =>{
    //                 const doc = d.docs.map(o => o.data())[0]
    //                 if(doc)
    //                 {
    //                     const updatedTasks = tasksObjs.map((t, i) => {
    //                         return {...t, isChecked: doc.tasks[i]}
    //                     })
    //                     setTasks(updatedTasks)
    //                 }
    //             })
    //         }
    //     })
    // },[selectedDate])

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
        // calculateDidTasksPercentPerMonth()
        //     .then(p => {
        //         setPercent(p)
        //     })
    }

    // obliczanie task per day do progress bar
    const calculateDidTasksPercent = () =>{
        let numOfDidTasks = 0
        tasks.forEach(t => {
            if(t.isChecked)
                numOfDidTasks++ 
            })
        return Math.round((numOfDidTasks/tasks.length) * 100)
    }

    // const calculateDidTasksPercentPerMonth = () =>{
        // // podział daty
    //     const month = selectedDate.toLocaleDateString().split(".")[1]
    //     const year = selectedDate.toLocaleDateString().split(".")[2]

    //     return new Promise((resolve, reject) =>{
    //         firestore
    //         .collection("completedTasks")
    //         .where("uid", "==", firebase.auth().currentUser.uid)
    //         .get()
    //         .then(d =>{
    //             const docs = d.docs.map(o => o.data()).filter(doc =>{
    //                 const m = doc.date.split(".")[1]
    //                 const y = doc.date.split(".")[2]
    //                 return m == month && y == year
    //             })

    //             let percent = 0
    //             if(docs.length>0)
    //             {
    //                 const numOfTasks = getDaysInMonth(month, year) * docs[0].tasks.length

    //                 let numOfCompleted = 0
    //                 docs.forEach(doc =>{
    //                     doc.tasks.forEach(t => {
    //                         if(t) numOfCompleted++
    //                     })
    //                 })
    
    //                 percent = (numOfCompleted / numOfTasks) * 100
    //                 resolve(percent)
    //             }
    //         })
    //     })
    // }
        // // przeliczenie ilości dni w danym miesiącu
    // const getDaysInMonth = (month, year) =>{
    //     return new Date(year, month, 0).getDate()
    // }
   
    return (
        <>
        {/* <div className="fullScreen">
            <img src={url} className="cat__img" />
            <button class="main-btn">Close</button>
        </div> */}
        <div className="tasks__container">
            <div className="tasks__progress-container">
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
            <div className="tasks__cal-container">
                <Calendar
                    defaultActiveStartDate={new Date()}
                    maxDate={new Date()}
                    onChange={handleCalendarDateChange}
                    value={selectedDate}
                />
                <div>
                    <p style={{margin: 10}}>{url}</p>
                </div>
            </div>
            </div>
        </>
    )
}    

export default UserTasksPage;