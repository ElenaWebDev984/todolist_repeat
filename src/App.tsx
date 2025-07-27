import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";


export const App = () => {

    // TODO BLL
    const todolistTitle = 'What to learn'

    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: Task['id']) => {
        // TODO create next state
        const nextState = tasks.filter(task => task.id !== taskId)
        // TODO set state
        setTasks(nextState)
    }



    //   TODO UI
    return (
        <div className="app">
            <TodolistItem title={todolistTitle}
                          tasks={tasks}
                          deleteTask={deleteTask}/>
        </div>
    )
}


