import {Button} from "./Button.tsx";

type TodolistItemTypes = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: Task['id']) => void
}

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks, deleteTask}: TodolistItemTypes) => {

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


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title='+'/>
            </div>
            {tasksList}
            <div>
                <Button title='All'/>
                <Button title='Active'/>
                <Button title='Completed'/>
            </div>
        </div>
    );
};

