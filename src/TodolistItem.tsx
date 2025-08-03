import {Button} from "./Button.tsx";
import {FilterValues, Todolist} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistItemTypes = {
    todolistId: Todolist['id']
    title: string
    tasks: Task[]
    deleteTask: (taskId: Task['id'], todolistId: Todolist['id']) => void
    changeTodolistFilter: (filter: FilterValues, todolistId: Todolist['id']) => void
    createTask: (title: string, todolistId: Todolist['id']) => void
    changeTaskStatusHandler: (taskId: Task['id'], newStatus: boolean, todolistId: Todolist['id']) => void
    filter: FilterValues
    deleteTodolist: (todolistId: Todolist['id']) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 createTask,
                                 changeTaskStatusHandler,
                                 changeTodolistFilter,
                                 filter,
                                 todolistId,
                                 deleteTodolist,
                             }: TodolistItemTypes) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const maxTaskTitleLength = 15

    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked, todolistId)}/>
                        <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                        <Button title='x'
                                onClickHandler={() => deleteTask(task.id, todolistId)}/>
                    </li>
                )
            })}
        </ul>

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(trimmedTitle, todolistId)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && addTaskCondition) {
            createTaskHandler()
        }
    }

    const createChangeFilterHandler = (newFilterValue: FilterValues) => changeTodolistFilter(newFilterValue, todolistId)

    const deleteTodolistHandler = () => deleteTodolist(todolistId)

    const addTaskCondition = Boolean(taskTitle && taskTitle.length <= maxTaskTitleLength)


    return (
        <div className='todolist'>
            <h3>
                {title}
                <Button title='X' onClickHandler={deleteTodolistHandler}/>
            </h3>
            <div>
                <input value={taskTitle}
                       placeholder={`Max ${maxTaskTitleLength} characters`}
                       onChange={onChangeTaskTitleHandler}
                       onKeyDown={onKeyDownCreateTaskHandler}
                       className={error ? 'error' : ''}
                />
                <Button title='+'
                        onClickHandler={createTaskHandler}
                        disabled={!addTaskCondition}/>
                {taskTitle && taskTitle.length <= maxTaskTitleLength &&
                    <div>Rest {maxTaskTitleLength - taskTitle.length} characters</div>}
                {taskTitle.length > maxTaskTitleLength && <div style={{color: 'red'}}>Title is too long</div>}
                {error && <div className='error-message'>Title is required</div>}
            </div>
            {tasksList}
            <div>
                <Button title='All'
                        classNames={filter === 'all' ? 'btn-filter-active' : ''}
                        onClickHandler={() => createChangeFilterHandler('all')}/>
                <Button title='Active'
                        classNames={filter === 'active' ? 'btn-filter-active' : ''}
                        onClickHandler={() => createChangeFilterHandler('active')}/>
                <Button title='Completed'
                        classNames={filter === 'completed' ? 'btn-filter-active' : ''}
                        onClickHandler={() => createChangeFilterHandler('completed')}/>
            </div>
        </div>
    );
};

