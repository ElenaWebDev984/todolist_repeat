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

    const createTask = (title: Todolist['title'], todolistId: Todolist['id']) => {
        // TODO variant 1
        const newTask: Task = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const updatedTasks = [...tasks[todolistId], newTask]
        const nextTasksState = {...tasks, [todolistId]: updatedTasks}
        setTasks(nextTasksState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
    }

    // TODO - Update

    const changeTaskStatusHandler = (taskId: Task['id'], newStatus: Task['isDone'], todolistId: Todolist['id']) => {
        // TODO variant 1
        const todolistTasks = tasks[todolistId]
        const updatedTasks = todolistTasks.map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        const nextState = {...tasks, [todolistId]: updatedTasks}
        setTasks(nextState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)})
    }

    // TODO - Delete:

    const deleteTask = (taskId: Task['id'], todolistId: Todolist['id']) => {
        // TODO variant 1
        const todolistTasks = tasks[todolistId]
        const updatedTasks = todolistTasks.filter(task => task.id !== taskId)
        const nextState = {...tasks, [todolistId]: updatedTasks}
        setTasks(nextState)
        // TODO variant 2
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const changeTodolistFilter = (filter: FilterValues, todolistId: Todolist['id']) => {
        const nextState = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        setTodolists(nextState)
    }

    const deleteTodolist = (todolistId: Todolist['id']) => {
        const nextState = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(nextState)
    }

    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: Todolist = {
            id: newTodolistId,
            title: title,
            filter: 'all',
        }
        const nextState = [...todolists, newTodolist]
        setTodolists(nextState)
    }


    //   TODO UI - Read

    const todolistsComponents = todolists.map(todolist => {
        let filteredTasks = tasks[todolist.id]
        if (todolist.filter === 'active') {
            filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
            filteredTasks = tasks[todolist.id].filter(task => task.isDone)
        }

        return (
            <TodolistItem key={todolist.id}
                          todolistId={todolist.id}
                          title={todolist.title}
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeTodolistFilter={changeTodolistFilter}
                          createTask={createTask}
                          changeTaskStatusHandler={changeTaskStatusHandler}
                          filter={todolist.filter}
                          deleteTodolist={deleteTodolist}/>
        )
    })



    return (
        <div className="app">
            {todolistsComponents}
        </div>
    )
}


