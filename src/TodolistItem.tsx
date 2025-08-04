import {Button} from "./Button.tsx";
import {FilterValues, Todolist} from "./App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

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


    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked, todolistId)}/>
                        <EditableSpan title={task.title}
                                      className={task.isDone ? 'task-done' : 'task'}
                        />
                        <Button title='x'
                                onClickHandler={() => deleteTask(task.id, todolistId)}/>
                    </li>
                )
            })}
        </ul>

    const createTaskHandler = (newItemTitle: string) => {
        createTask(newItemTitle, todolistId)
    }


    const createChangeFilterHandler = (newFilterValue: FilterValues) => changeTodolistFilter(newFilterValue, todolistId)

    const deleteTodolistHandler = () => deleteTodolist(todolistId)


    return (
        <div className='todolist'>
            <h3>
                {title}
                <Button title='X' onClickHandler={deleteTodolistHandler}/>
            </h3>
            <CreateItemForm createItem={createTaskHandler} maxItemTitleLength={15}/>
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

