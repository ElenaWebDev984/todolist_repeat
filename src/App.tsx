import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type FilterValues = 'all' | 'active' | 'completed'


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
        // TODO immutable change data
        const nextState = tasks.filter(task => task.id !== taskId)
        // TODO set next state
        setTasks(nextState)
    }


    //   TODO UI
    const [filter, setFilter] = useState<FilterValues>('all')
    const changeTodolistFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const getFilteredTasks = (tasks: Task[], filter: FilterValues): Task[] => {
        let filteredTasks = tasks
        if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.isDone)
        }
        return filteredTasks
    }

    const filteredTasks: Task[] = getFilteredTasks(tasks, filter)



    return (
        <div className="app">
            <TodolistItem title={todolistTitle}
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeTodolistFilter={changeTodolistFilter}/>
        </div>
    )
}


