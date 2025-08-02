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

    const createTask = (title: string, todolistId: string) => {
        // TODO variant 1
        const newTask: Task = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const updatedTasks = [...tasks[todolistId], newTask]
        const nextTasksState = {...tasks, [todolistId]:updatedTasks}
        setTasks(nextTasksState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
    }

    // TODO - Update

    const changeTaskStatusHandler = (taskId: Task['id'], newStatus: boolean, todolistId: string) => {
        // TODO variant 1
        const todolistTasks = tasks[todolistId]
        const updatedTasks = todolistTasks.map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        const nextState = {...tasks, [todolistId]:updatedTasks}
        setTasks(nextState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)})
    }

    // TODO - Delete:

    const deleteTask = (taskId: Task['id'], todolistId: string) => {
        // TODO variant 1
        const todolistTasks = tasks[todolistId]
        const updatedTasks = todolistTasks.filter(task => task.id !== taskId)
        const nextState = {...tasks, [todolistId]:updatedTasks}
        setTasks(nextState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
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


