import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [todolistId: string]: Task[]
}


export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Cheese', isDone: false},
        ],
    })


    // TODO BLL

    // TODO - Create

    const createTask = (title: string) => {
        const newTask: Task = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const nextState = [...tasks, newTask]
        setTasks(nextState)
    }

    // TODO - Update

    const changeTaskStatusHandler = (taskId: Task['id'], newStatus: boolean) => {
        const nextState = tasks.map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        setTasks(nextState)
    }

    // TODO - Delete:

    const deleteTask = (taskId: Task['id']) => {
        // TODO create next state
        // TODO immutable change data
        const nextState = tasks.filter(task => task.id !== taskId)
        // TODO set next state
        setTasks(nextState)
    }


    //   TODO UI - Read

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
                          changeTodolistFilter={changeTodolistFilter}
                          createTask={createTask}
                          changeTaskStatusHandler={changeTaskStatusHandler}
                          filter={filter}/>
        </div>
    )
}


