import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";

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
                <Button title='+'
                onClick={() => createTask('New task')}/>
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

