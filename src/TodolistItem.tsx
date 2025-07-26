type TodolistItemTypes = {
    title: string
    tasks: Task[]
}

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks}: TodolistItemTypes) => {

    const tasksListItem = tasks.map(task => {
        return (
        <li>
            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
        </li>
    )
    })


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksListItem}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

