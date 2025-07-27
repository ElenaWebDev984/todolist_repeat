import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";


export const App = () => {

    // TODO BLL
    const todolistTitle = 'What to learn'
    let tasks: Task[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]

    const deleteTask = (taskId: Task['id']) => {
        tasks = tasks.filter(task => task.id !== taskId)
        console.log(tasks)
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


