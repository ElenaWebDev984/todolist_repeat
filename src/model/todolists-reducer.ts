import {Todolist} from "../App.tsx";

export type DeleteTodolistActionType = {
    type: 'delete_todolist',
    payload: {
        id: string,
    }
}

export const todolistsReducer = (todolists: Todolist[], action: DeleteTodolistActionType):Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return todolists.filter(todolist => todolist.id !== action.payload.id)
        default:
            return todolists;
    }
}

// TODO AC - Action Created
export const DeleteTodolistAC = (id: string): DeleteTodolistActionType => ({
    type: 'delete_todolist',
        payload: {
        id: id,
    }
})