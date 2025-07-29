import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistItemTypes = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: Task['id']) => void
    changeTodolistFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
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
                             }: TodolistItemTypes) => {

    const [taskTitle, setTaskTitle] = useState('')

    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title='x'
                                onClick={() => deleteTask(task.id)}/>
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


    const addTaskCondition = Boolean(taskTitle && taskTitle.length <= 15)


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       placeholder='Max 15 characters'
                       onChange={onChangeTaskTitleHandler}
                       onKeyDown={onKeyDownCreateTaskHandler}
                    />
                <Button title='+'
                        onClick={createTaskHandler}
                        disabled={!addTaskCondition}/>
                {taskTitle && taskTitle.length <= 15 && <div>Rest {15 - taskTitle.length} characters</div>}
                {taskTitle.length > 15 && <div style={{color: 'red'}}>Title is too long</div>}
            </div>
            {tasksList}
            <div>
                <Button title='All'
                        onClick={() => changeTodolistFilter('all')}/>
                <Button title='Active'
                        onClick={() => changeTodolistFilter('active')}/>
                <Button title='Completed'
                        onClick={() => changeTodolistFilter('completed')}/>
            </div>
        </div>
    );
};

