import {Todolist} from "../App.tsx";

type DeleteTodolistActionType = {
    type: 'delete_todolist',
    payload: {
        id: string,
    }
}

export const todolistsReducer = (todolists: Todolist[], action: any):Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return todolists.filter(todolist => todolist.id !== action.payload.id)
        default:
            return todolists;
    }
}