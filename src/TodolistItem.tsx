import Button from '@mui/material/Button';
import {FilterValues, Todolist} from "./App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {ChangeEvent} from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TodolistItemTypes = {
    title: string
    tasks: Task[]
    filter: FilterValues
    todolistId: Todolist['id']
    deleteTask: (taskId: Task['id'], todolistId: Todolist['id']) => void
    createTask: (title: string, todolistId: Todolist['id']) => void
    changeTaskStatus: (taskId: Task['id'], newStatus: boolean, todolistId: Todolist['id']) => void
    changeTaskTitle: (taskId: Task['id'], newTitle: Task['title'], todolistId: Todolist['id']) => void
    deleteTodolist: (todolistId: Todolist['id']) => void
    changeTodolistFilter: (filter: FilterValues, todolistId: Todolist['id']) => void
    changeTodolistTitle: (newTitle: Todolist['title'], todolistId: Todolist['id']) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 filter,
                                 todolistId,
                                 deleteTask,
                                 createTask,
                                 changeTaskStatus,
                                 changeTaskTitle,
                                 deleteTodolist,
                                 changeTodolistFilter,
                                 changeTodolistTitle,
                             }: TodolistItemTypes) => {


    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(task.id, newTitle, todolistId)

                return (
                    <li>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={changeTaskStatusHandler}
                        />
                        <EditableSpan title={task.title}
                                      className={task.isDone ? 'task-done' : 'task'}
                                      changeItemTitle={changeTaskTitleHandler}
                        />
                        <IconButton onClick={() => deleteTask(task.id, todolistId)}
                                    size='small'>
                            <DeleteIcon fontSize='small' />
                        </IconButton>
                    </li>
                )
            })}
        </ul>

    const createTaskHandler = (newItemTitle: string) => {
        createTask(newItemTitle, todolistId)
    }


    const createChangeFilterHandler = (newFilterValue: FilterValues) => changeTodolistFilter(newFilterValue, todolistId)

    const deleteTodolistHandler = () => deleteTodolist(todolistId)

    const changeTodolistTitleHandler = (newTitle: string) => changeTodolistTitle(newTitle, todolistId)


    return (
        <div className='todolist'>
            <h3>
                <EditableSpan title={title} changeItemTitle={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <CreateItemForm createItem={createTaskHandler} maxItemTitleLength={15}/>
            {tasksList}
            <div>
                <Button variant='contained'
                        onClick={() => createChangeFilterHandler('all')}
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        size='small'>
                    All
                </Button>
                <Button variant='contained'
                        onClick={() => createChangeFilterHandler('active')}
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        size='small'>
                    Active
                </Button>
                <Button variant='contained'
                        onClick={() => createChangeFilterHandler('completed')}
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        size='small'>
                    Completed
                </Button>

            </div>
        </div>
    );
};

