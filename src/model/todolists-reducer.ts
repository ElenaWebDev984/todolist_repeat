import {Todolist} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
type ActionType = DeleteTodolistActionType | CreateTodolistActionType

export const todolistsReducer = (todolists: Todolist[], action: ActionType):Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return todolists.filter(todolist => todolist.id !== action.payload.id)

        case 'create_todolist':
           const newTodolistId = v1()
            const newTodolist: Todolist = {
                id: newTodolistId,
                title: action.payload.title,
                filter: 'all',
            }
            return [...todolists, newTodolist]

        default:
            return todolists;
    }
}

// TODO AC - Action Created
export const deleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
        payload: { id }
} as const )

export const createTodolistAC = (title: string) => ({
    type: 'create_todolist',
    payload: { title }
} as const )