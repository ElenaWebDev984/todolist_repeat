import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistItemTypes = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: Task['id']) => void
    changeTodolistFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatusHandler: (taskId: Task['id'], newStatus: boolean) => void
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
                                 changeTodolistFilter,
                                 createTask,
                                 changeTaskStatusHandler,
                             }: TodolistItemTypes) => {

    const [taskTitle, setTaskTitle] = useState('')

    const maxTaskTitleLength = 15

    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}/>
                        <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                        <Button title='x'
                                onClickHandler={() => deleteTask(task.id)}/>
                    </li>
                )
            })}
        </ul>

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && addTaskCondition) {
            createTaskHandler()
        }
    }


    const addTaskCondition = Boolean(taskTitle && taskTitle.length <= maxTaskTitleLength)


    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       placeholder={`Max ${maxTaskTitleLength} characters`}
                       onChange={onChangeTaskTitleHandler}
                       onKeyDown={onKeyDownCreateTaskHandler}
                />
                <Button title='+'
                        onClickHandler={createTaskHandler}
                        disabled={!addTaskCondition}/>
                {taskTitle && taskTitle.length <= maxTaskTitleLength &&
                    <div>Rest {maxTaskTitleLength - taskTitle.length} characters</div>}
                {taskTitle.length > maxTaskTitleLength && <div style={{color: 'red'}}>Title is too long</div>}
            </div>
            {tasksList}
            <div>
                <Button title='All'
                        // classNames={}
                        onClickHandler={() => changeTodolistFilter('all')}/>
                <Button title='Active'
                        // classNames={}
                        onClickHandler={() => changeTodolistFilter('active')}/>
                <Button title='Completed'
                        classNames='btn-filter-active'
                        onClickHandler={() => changeTodolistFilter('completed')}/>
            </div>
        </div>
    );
};

