import {FilterValues, Todolist} from "../App.tsx";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
type ActionType =
    DeleteTodolistActionType
    | CreateTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (todolists: Todolist[], action: ActionType): Todolist[] => {
    switch (action.type) {

        case 'delete_todolist':
            const id = action.payload.id
            return todolists.filter(todolist => todolist.id !== id)

        case 'create_todolist': {
            const {title, id} = action.payload
            const newTodolist: Todolist = {id, title, filter: 'all'}
            return [...todolists, newTodolist];
        }

        case 'change_todolist_title': {
            const {id, title} = action.payload
            return todolists.map(todolist => todolist.id === id ? {...todolist, title} : todolist)
        }

        case 'change_todolist_filter': {
            const {id, filter} = action.payload
            return todolists.map(todolist => todolist.id === id ? {...todolist, filter} : todolist)
        }

        default:
            return todolists;
    }
}

// TODO AC - Action Created
export const deleteTodolistAC = (id: Todolist['id']) => ({
    type: 'delete_todolist',
    payload: {id},
} as const)

export const createTodolistAC = (payload: {title: Todolist['title'], id: Todolist['id']}) => ({
    type: 'create_todolist',
    payload,
} as const)

export const changeTodolistTitleAC = (payload: { id: Todolist['id'], title: Todolist['title'] }) => ({
    type: 'change_todolist_title',
    payload,
} as const)

export const changeTodolistFilterAC = (payload: { id: Todolist['id'], filter: FilterValues }) => ({
    type: 'change_todolist_filter',
    payload,
} as const)