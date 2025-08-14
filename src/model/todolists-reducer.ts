import {Todolist} from "../App.tsx";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>

export const todolistsReducer = (todolists: Todolist[], action: DeleteTodolistActionType | CreateTodolistActionType):Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return todolists.filter(todolist => todolist.id !== action.payload.id)
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
    type: 'create_todolistAC',
    payload: { title }
} as const)